import axios from './../../utils/axios-handler'
import {GET_MY_CHAT, NEW_CHAT,ADD_CHAT_MSG,SET_CHAT_WITH,NEW_MSG_OTHER_USER,GET_A_CHAT } from './types';
import history from './../../utils/history'

// RETURN ERRORS
export const getMyChat = () => dispatch => {
  axios
    .get(`/chat/my-chat`)
    .then((res) =>{
      dispatch({
        type: GET_MY_CHAT,
        payload: res.data,
      })
    }).catch(err =>{
      console.log(err)
})
};


export const createChat = (userId) => dispatch => {
  axios
    .post(`/chat/create-chat/${userId}`)
    .then((res) =>{
      dispatch({
        type: NEW_CHAT,
        payload: res.data
      })
      history.push('/chat')
    }).catch(err =>{
      console.log(err)
})
};



export const getAChat = (userId) => dispatch => {
  axios
    .get(`/chat/get-chat/${userId}`)
    .then((res) =>{
      dispatch({
        type: GET_A_CHAT,
        payload: res.data
      })
     
    }).catch(err =>{
      console.log(err)
})
};



export const addMessage = (chatId,authId,text) => dispatch => {
 
axios
  .put(`/chat/add-chat`,{chatId: chatId, message:{text:text, postedBy: authId}})
  .then((res) =>{
    dispatch({
      type: ADD_CHAT_MSG,
      payload: res.data
    })
  }).catch(err =>{
    console.log(err)
})
};

export const newMessageOtherUser  = (chatId, message) => dispatch => {
  dispatch({
    type: NEW_MSG_OTHER_USER,
    chatId : chatId,
    message: message
  })
}


export const setChatWith = (user) => dispatch =>{
  dispatch({
    type: SET_CHAT_WITH,
    payload: user
  })
}

