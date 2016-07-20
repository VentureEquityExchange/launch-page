import VEXMembers from '../contracts/compiled/VEXMembers.json';
console.log(JSON.parse(VEXMembers.interface));

exports.actions = (type, payload) => {
  switch(type) {
    case 'GET_MEMBERS' :
      return {
        type,
        members : payload,
      };
      break;
    case 'ERROR' :
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

exports.getMembers = () => {
  return (dispatch) => {
    dispatch(exports.actions('GET_MEMBERS', ["0x34a4d6c830193f0244364a1711b182868c9feda9", "0x0cc05892f53d64a98454b5985aa329af0cd2afee"]));
  }
}
