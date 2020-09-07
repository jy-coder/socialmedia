import { SET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const setError = (msg) => dispatch => {
//   console.log(msg)
   dispatch({
    type: SET_ERRORS,
    payload:msg
  });
};

// CLEAR ERRORS
export const clearErrors = () => dispatch  => {
 dispatch({
    type: CLEAR_ERRORS
    
  });
};