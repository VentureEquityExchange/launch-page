function action(type, payload) {
  switch(type){
    case 'MAIN_VIEW':
      return {
        type,
        main : payload
      };
      break;
    case 'VIEW_ERROR':
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
  action,
}
