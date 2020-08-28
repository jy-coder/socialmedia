import axios from './../../utils/axios-handler'
import history from './../../utils/history'
import {setError} from './../actions/errorActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_MY_PROFILE,
  NO_USER,
  SET_SUCCESS_MSG,
  REMOVE_MY_FOLLOWING,
  ADD_MY_FOLLOWING,
  UPDATE_FOLLOWER,
  GET_ERRORS
} from './types';


// Check token & load user
export const loadUser = () => (dispatch) => {

  axios
    .get('/user/getUser')
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
     console.log(err)
    });
};

// Register User
export const register = ({ name, email, password, confirmPassword }) => (dispatch) => {
  axios
    .post('/user/signup', { name, email, password, confirmPassword})
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
    })
};


// Login User
export const login = ({ email, password }) => (dispatch) => {


    axios
    .post('/user/login', { email, password })
    .then(res =>{
        setAuthorizationHeader(res.data.token);      
        history.push('/')
    })
    .catch(err => {
      // console.log(err.response.data.message)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.message
      })
    })
};


export const updateMe = (form) => (dispatch) => {
  axios
  ({method: 'patch',url:'/user/updateMe', data:form,headers: {'Content-Type': 'multipart/form-data' }})
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


export const removeMyFollowing = (id) => (dispatch) => {

  dispatch({
    type: REMOVE_MY_FOLLOWING,
    payload: id
  });
}

export const addMyFollowing = (user) => (dispatch) => {
  dispatch({
    type: ADD_MY_FOLLOWING,
    payload: user
  });
}

export const updateFollower = (followers) => (dispatch) => {
  dispatch({
    type: UPDATE_FOLLOWER,
    payload: followers
  });
}

// Logout User
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: LOGOUT_SUCCESS });
  history.push('/')
  
};




const setAuthorizationHeader = (tokenPassed) => {
    const token = `Bearer ${tokenPassed}`;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
  };


