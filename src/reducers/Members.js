const DEFAULT_MEMBER_STATE = {
  isMember : undefined,
  error : undefined,
  txHash : undefined
}

export default function Members(state = DEFAULT_MEMBER_STATE, action) {
  switch(action.type) {
    case 'IS_MEMBER' :
      return {
        ...state,
        isMember : action.isMember,
      };
      break;
    case 'MEMBER_ERROR' :
      return {
        ...state,
        error : action.error,
      };
      break;
    case 'PURCHASING_MEMBERSHIP':
      return {
        ...state,
        txHash : action.txHash,
      };
      break;
    default :
      return state;
  }
}
