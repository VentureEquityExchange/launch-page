const DEFAULT_VIEWS_STATE = {
  main : 'Members',
  error : undefined
};


export default function Views(state = DEFAULT_VIEWS_STATE, action){
  switch(action.type){
    case 'MAIN_VIEW':
      return {
        ...state,
        main : action.main
      };
      break;
    case 'VIEW_ERROR':
      return {
        ...state,
        error : action.error
      };
      break;
    default:
      return state;
  }
}
