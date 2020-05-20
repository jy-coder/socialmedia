import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg,status) => dispatch => {
   dispatch({
    type: GET_ERRORS,
    payload: { msg, status}
  });
};

// CLEAR ERRORS
export const clearErrors = () => dispatch  => {
 dispatch({
    type: CLEAR_ERRORS
    
  });
};