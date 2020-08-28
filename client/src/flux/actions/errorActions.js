import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const setError = (msg) => dispatch => {
//   console.log(msg)
   dispatch({
    type: GET_ERRORS,
    payload:msg
  });
};

// CLEAR ERRORS
export const clearErrors = () => dispatch  => {
 dispatch({
    type: CLEAR_ERRORS
    
  });
};