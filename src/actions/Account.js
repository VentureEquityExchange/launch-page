import Web3 from 'web3';
import Promise from 'bluebird';

let web3;
if(window.web3){
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
};

function getAccount() {
  return (dispatch) => {

    const eth = Promise.promisifyAll(web3.eth);

    eth.getAccountsAsync().then((accounts) => {
      dispatch(action('GET_ACCOUNT', accounts[0]));
    }).catch((error) => {
      dispatch(action('ACCOUNT_ERROR', error));
    });
  }
}

function action(type, payload) {
  switch(type){
    case 'GET_ACCOUNT':
    return {
      type,
      account : payload
    };
    break;
    case 'ACCOUNT_ERROR':
    return {
      type,
      error : payload
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

module.exports = {
  getAccount,
  action,
}
