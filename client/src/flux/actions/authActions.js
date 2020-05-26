import axios from 'axios';
import { returnErrors } from './errorActions';
import history from './../../utils/history'


import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_MY_PROFILE,
  NO_USER,
  CLEAR_ERRORS,
  SET_SUCCESS_MSG,
  CLEAR_SUCCESS_MSG
} from './types';


// Check token & load user
export const loadUser = () => (dispatch) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('http://127.0.0.1:1337/api/user/getUser')
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      if(err.response){
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    }
    });
};

// Register User
export const register = ({ name, email, password, confirmPassword }) => (
  dispatch
) => {
  // Request body
  axios
    .post('http://127.0.0.1:1337/api/user/signup', { name, email, password, confirmPassword})
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      if(err.response){
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      })};
    });
};


export const noUser = () =>(dispatch) =>{
  dispatch({
    type: NO_USER
  })
}

// Login User
export const login = ({ email, password }) => (dispatch) => {
    axios
    .post('http://127.0.0.1:1337/api/user/login', { email, password })
    .then(res =>{
        setAuthorizationHeader(res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user
      })
      dispatch({ type: CLEAR_ERRORS });
      
      history.push('/')
      

    })
    .catch(err => {
      if(err.response){
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    }})
};


export const updateMe = (form) => (dispatch) => {
  axios
  ({method: 'patch',url:'http://127.0.0.1:1337/api/user/updateMe', data:form,headers: {'Content-Type': 'multipart/form-data' }})
  .then(res => {	
     dispatch({
      type:SET_SUCCESS_MSG,
      payload: "You have successfully updated your profile!"
     })
    
  })

  .catch((err) => {
    if(err.response)
      console.log(err)
  
  })
}


// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const setAuthorizationHeader = (tokenPassed) => {
    const token = `Bearer ${tokenPassed}`;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
  };


