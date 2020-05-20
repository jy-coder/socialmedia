import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: "",
  status: ""
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case CLEAR_ERRORS:
      return {
        msg:"",
        status:""
      }
    default:
      return state;
  }
}