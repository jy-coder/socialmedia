import axios from 'axios'
import {GET_MY_CHAT, NEW_CHAT,ADD_CHAT_MSG,SET_CHAT_WITH } from './types';
import { returnErrors} from './errorActions'

// RETURN ERRORS
export const getMyChat = () => dispatch => {
  axios
    .get(`http://127.0.0.1:1337/api/chat/my-chat`)
    .then((res) =>{
      dispatch({
        type: GET_MY_CHAT,
        payload: res.data,
      })
    }).catch(err =>{
      if(err.response){
      dispatch(returnErrors(err.response.data, err.response.status))
      }
})
};


export const getAChat = (userId) => dispatch => {
  axios
    .post(`http://127.0.0.1:1337/api/chat/create-chat`,{user: userId})
    .then((res) =>{
      dispatch({
        type: NEW_CHAT,
        payload: res.data
      })
    }).catch(err =>{
      if(err.response){
      dispatch(returnErrors(err.response.data, err.response.status))
      }
})
};



export const addMessage = (chatId,authId,text) => dispatch => {
axios
  .put(`http://127.0.0.1:1337/api/chat/add-chat`,{chatId: chatId, chat:{text:text, postedBy: authId}})
  .then((res) =>{
    dispatch({
      type: ADD_CHAT_MSG,
    })
  }).catch(err =>{
    if(err.response){
    dispatch(returnErrors(err.response.data, err.response.status))
    }
})
};


export const setChatWith = (user) => dispatch =>{
  dispatch({
    type: SET_CHAT_WITH,
    payload: user
  })
}

