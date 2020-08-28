import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: "",

}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload,
        status: action.status
    
      };
    case CLEAR_ERRORS:
      return {
        msg:"",
      
      }
    default:
      return state;
  }
}