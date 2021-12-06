import Web3 from 'web3';
import { ContractBase } from './ContractBase';

interface Trait {
  trait_type: string,
  value: string
}

interface Metadata {
  name: string,
  external_url: string,
  image: string,
  tooltip: string,
  attributes: Trait[]
}

export class Chimp extends ContractBase {
  metadata: Metadata | null = null;

  constructor(public id: number, public isHonorary: boolean, web3: Web3) {
    super(web3);
  }

  getContractAddr() {
    return this.isHonorary ? Chimp.HONORARY_CONTRACT_ADDR : Chimp.CHIMP_CONTRACT_ADDR;
  }

  async fetchMetadata(): Promise<Metadata> {
    const contract = this.isHonorary ? this.getHonoraryContract() : this.getChimpContract();

    const tokenURI = await contract.methods.tokenURI(this.id).call();

    const arweaveUrl = tokenURI.replace('ar://', 'https://arweave.net/')

    const res = await fetch(arweaveUrl);

    const data = await res.json() as Metadata;

    if (this.isHonorary && this.id <= 6) {
      // This is a minor fix to allow honorary chimps to have different names
      data.name = `Honorary Chimp #${this.id}`
    }

    this.metadata = data;

    return data;
  }
  
  transfer(ownerAddress: string, toAddress: string) {
    const contract = this.isHonorary ? this.getHonoraryContract() : this.getChimpContract(); 

    return contract.methods.transferFrom(ownerAddress, toAddress, this.id);
  }
}
