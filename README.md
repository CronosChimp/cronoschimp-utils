# Cronos Chimp Utils

The official Cronos Chimp Club javascript library

## Contracts

### 10000 Chimps
0x562F021423D75A1636DB5bE1C4D99Bc005ccebFe

### Honorary Chimps
0x387cd44676CDEe5E398eC1a152A5136d9f4E1760

## Library Installation
```
npm install cronoschimp-utils

yarn add cronoschimp-utils
```

## Library Usage
The below includes examples to 

```js
import { CronosChimps, Chimp } from 'cronoschimp-utils'
import Web3 from 'web3'

const owner = '0xA4Dba41e765A7721fF051B64865A31226F61a4D8';

async function getAllChimpsByUser(owner) {
  const web3 = new Web3('https://evm-cronos.crypto.org');

  const cronosChimps = new CronosChimps(web3);

  const chimpsByOwner = await cronosChimps.getChimpsByOwner(ownerAddress);

  for (let i = 0; i < chimpsByOwner.length; i++) {
    await chimpsByOwner[i].fetchMetadata();

    // gets the chimps metadata
    console.log(chimpsByOwner[i]);
  }

  return chimpsByOwner;
}

getAllChimpsByUser.then(() => {
  // Transfer a chimp
  await chimps(0).transfer(ownerAddress, '0xAdde55...').send();
})


// Transfer Chimp without fetching all chimps
const chimpId = 5;
const isHonorary = false;
const chimp = new Chimp(chimpId, isHonorary, web3);

chimp.transfer(owner, '0xAdde55...').send();
```

Get contract addresses and ABI
```js
import { CronosChimps, ABI } from 'cronoschimp-utils'

console.log(CronosChimps.CHIMP_CONTRACT_ADDR);

console.log(CronosChimps.HONORARY_CONTRACT_ADDR);

console.log(ABI);
```

## Arweave conversion
If you are dealing with arweave, please convert any arweave protocol url into https url

ar:// -> https://arweave.net/
