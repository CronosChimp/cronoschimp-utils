import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import abi from './abi.json';

export class ContractBase {
  constructor(public web3 = new Web3('https://evm-cronos.crypto.org')) {}

  public static CHIMP_CONTRACT_ADDR = '0x562F021423D75A1636DB5bE1C4D99Bc005ccebFe';

  public static HONORARY_CONTRACT_ADDR = '0x387cd44676CDEe5E398eC1a152A5136d9f4E1760';

  getChimpContract(): Contract {
    return new this.web3.eth.Contract(abi as AbiItem[], ContractBase.CHIMP_CONTRACT_ADDR)
  }

  getHonoraryContract(): Contract {
    return new this.web3.eth.Contract(abi as AbiItem[], ContractBase.HONORARY_CONTRACT_ADDR) 
  }
}