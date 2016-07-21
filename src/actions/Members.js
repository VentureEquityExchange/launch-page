import ContractInfo from '../contracts/compiled/VEXMembers.json';
import Web3 from 'web3';
import Promise from 'bluebird';
import async from 'async';

let web3;
if(window.web3){
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
};

const abi = JSON.parse(ContractInfo['interface']);
const address = ContractInfo['txReceipt']['contractAddress'];
const Contract = web3.eth.contract(abi).at(address);

function action(type, payload) {
  switch(type) {
    case 'IS_MEMBER' :
      return {
        type,
        isMember : payload,
      };
      break;
    case 'PURCHASING_MEMBERSHIP' :
      return {
        type,
        txHash : payload,
      };
      break;
    case 'MEMBER_ERROR' :
      return {
        type,
        error : payload,
      };
      break;
    default :
      let error = new Error("Needs action type");
      return {
        type : 'ERROR',
        error,
      };
  }
}

function getMember(memberAddress) {
  return (dispatch) => {
    Contract.member.call(memberAddress, (error, member) => {
      if(error){dispatch(action("MEMBER_ERROR", error));}
      dispatch(action("IS_MEMBER", member));
    });
  }
}

function becomeMember(ethereumAddress, value) {
  return (dispatch) => {
    Contract.becomeMember({value : value, from : ethereumAddress, gas : 4712388}, (error, txhash) => {
      if(error){dispatch(action("MEMBER_ERROR", error));}
      dispatch(action("PURCHASING_MEMBERSHIP", txhash));
    });
  }
}

module.exports = {
  action,
  getMember,
  becomeMember,
}
