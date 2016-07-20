const DEFAULT_MEMBER_STATE = {
  members : [],
  error : undefined,
}

export default function Members(state = DEFAULT_MEMBER_STATE, action) {
  switch(action.type) {
    case 'GET_MEMBERS' :
      return {
        ...state,
        members : action.members,
      };
      break;
    case 'ERROR' :
      return {
        ...state,
        error : action.error,
      };
      break;
    default :
      return state;
  }
}
