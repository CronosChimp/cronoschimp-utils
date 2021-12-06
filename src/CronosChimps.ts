import Web3 from 'web3';
import { Chimp } from './Chimp';
import { ContractBase } from './ContractBase';

export class CronosChimps extends ContractBase {
  constructor(public web3 = new Web3('https://evm-cronos.crypto.org')) {
    super(web3);
  }

  getChimpsBalance(address: string): Promise<number> {
    return this.getChimpContract().methods.balanceOf(address).call();
  }

  getHonoraryBalance(address: string): Promise<number> {
    return this.getHonoraryContract().methods.balanceOf(address).call(); 
  }

  async getBalance(address: string): Promise<number> {
    const [chimpsBalance, honoraryBalance] = await Promise.all([this.getChimpsBalance(address), this.getHonoraryBalance(address)]);

    return chimpsBalance + honoraryBalance;
  }

  async getChimpsByOwner(address: string): Promise<Chimp[]> {
    const chimpsBalance = await this.getChimpsBalance(address); 

    const chimps: Chimp[] = [];

    for (let i = 0; i < chimpsBalance; i++) {
      const tokenId = await this.getChimpContract().methods.tokenOfOwnerByIndex(address, i).call();

      const chimp = new Chimp(tokenId, false, this.web3);

      chimps.push(chimp);
    }

    const honoraryBalance = await this.getHonoraryBalance(address); 

    for (let i = 0; i < honoraryBalance; i++) {
      const tokenId = await this.getHonoraryContract().methods.tokenOfOwnerByIndex(address, i).call();

      const chimp = new Chimp(tokenId, true, this.web3);

      chimps.push(chimp);
    }

    return chimps;
  }
}
