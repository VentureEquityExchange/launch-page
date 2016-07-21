const DEFAULT_ACCOUNT_STATE = {
  account : undefined,
  error : undefined
}

export default function Account(state = DEFAULT_ACCOUNT_STATE, action) {
  switch(action.type){
    case 'GET_ACCOUNT':
      return {
        ...state,
        account : action.account
      };
      break;
    case 'ACCOUNT_ERROR':
      return {
        ...state,
        error : action.error
      };
      break;
    default:
      return state;
  }
}
