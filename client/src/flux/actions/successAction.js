import { SET_SUCCESS_MSG, CLEAR_SUCCESS_MSG } from './types';

// RETURN ERRORS
export const returnErrors = (msg) => dispatch => {
   dispatch({
    type: SET_SUCCESS_MSG,
    payload: msg
  });
};

// CLEAR ERRORS
export const clearErrors = () => dispatch  => {
 dispatch({
    type: CLEAR_SUCCESS_MSG
    
  });
};