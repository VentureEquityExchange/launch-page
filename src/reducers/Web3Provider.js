const DEFAULT_WEB3_PROVIDER = {
  rpcProvider : "http://localhost:8545",
  error : undefined,
}

export default function Web3Provider(state = DEFAULT_WEB3_PROVIDER, action) {
  switch(action.type){
    case "SET_PROVIDER":
      return {
        ...state,
        rpcProvider : action.rpcProvider,
        error : action.error,
      };
      break;
    case "PROVIDER_ERROR":
      return {
        ...state,
        rpcProvider : action.rpcProvider,
        error : action.error
      };
      break;
    default:
      return state;
  }
}
