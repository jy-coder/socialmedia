import { ADD_CHAT_MSG,GET_MY_CHAT,GET_A_CHAT,NEW_CHAT,SET_CHAT_WITH } from '../actions/types';


const initialState = {
  userChat: [],
  chatWith: null,
  singleChat:null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_CHAT:
      return {
        userChat: action.payload
        // {...chat, user: chat.filter(user._id !== action.authId )}
      };
    case SET_CHAT_WITH:
      return {
        ...state,
        chatWith: action.payload
      }

    case NEW_CHAT:
      return {
        ...state,
        singleChat: action.payload
      }

  

    case  ADD_CHAT_MSG:
      return {
        userChat: action.payload
      };

    default:
      return state;
  }
}