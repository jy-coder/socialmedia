import { CLEAR_SUCCESS_MSG, SET_SUCCESS_MSG } from '../actions/types';

const initialState = {
  msg: ""
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SUCCESS_MSG:
      return {
        msg: action.payload
      };
    case CLEAR_SUCCESS_MSG:
      return {
        msg:"",
      }
    default:
      return state;
  }
}