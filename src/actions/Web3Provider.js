import Web3 from 'web3';
import Promise from 'bluebird';

function setupEthereumProvider(ethereumProvider) {
  return (dispatch) => {

    // If this is not working,
    // Then try running the application outside of webpack-dev-server;

    if(window.web3){

      web3 = new Web3(window.web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider(ethereumProvider));
    };

    const eth = Promise.promisifyAll(web3.eth);

    eth.getAccountsAsync().then((accounts) => {

      if(!web3.currentProvider.host){
        dispatch(actions("SET_PROVIDER", "MetaMask"));
      } else {
        dispatch(actions("SET_PROVIDER", web3.currentProvider.host));
      };

    }).catch((error) => {
      dispatch(actions("PROVIDER_ERROR", error.message));
    });
  }
}


function actions(type, payload) {
  switch(type){
    case "SET_PROVIDER":
      return {
        type,
        rpcProvider : payload,
        error : undefined,
      };
      break;
    case "PROVIDER_ERROR":
      return {
        type,
        rpcProvider : undefined,
        error : payload,
      };
      break;
    default:
      var error = new Error("Needs Action Type");
      return {
        type : "PROVIDER_ERROR",
        error
      };
  }
}

module.exports = {
  actions,
  setupEthereumProvider,
}
