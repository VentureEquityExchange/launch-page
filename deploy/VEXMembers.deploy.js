import { compiledDirectory, web3Provider, deployAccount } from '../config';
import Promise from 'bluebird';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));
const jsonfile = Promise.promisifyAll(require('jsonfile'));
const eth = Promise.promisifyAll(web3.eth);
const contract = "VEXMembers";

let ContractInfo = new Object();
let abi;
let bytecode;

jsonfile.readFileAsync(`${compiledDirectory}/${contract}.json`).then((compiled) => {
  ContractInfo = compiled;
  abi = compiled.interface;
  bytecode = compiled.bytecode;

  return eth.contract(JSON.parse(abi));
}).then((Contract) => {

  return Contract.new({from : deployAccount, data : bytecode, gas : 4712388});

}).then((contract) => {

  return getTransactionReceipt(contract.transactionHash);

}).then((txReceipt) => {
  ContractInfo['txReceipt'] = txReceipt;

  return jsonfile.writeFileAsync(`${compiledDirectory}/${contract}.json`, ContractInfo);

}).then(() => {

  console.log(`${contract} deployed & json saved`);

}).catch((error) => {
  console.log(error);
});


function getTransactionReceipt(txHash) {
  return new Promise((resolve, reject) => {
    eth.getTransactionReceiptAsync(txHash).then((txReceipt) => {
      if(!txReceipt){
        getTransactionReceipt(txHash).then((txReceipt) => {
          resolve(txReceipt);
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve(txReceipt);
      };
    }).catch((error) => {
      reject(error);
    })
  });
}
