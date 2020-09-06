import { ADD_CHAT_MSG,GET_MY_CHAT,GET_A_CHAT,NEW_CHAT,SET_CHAT_WITH,NEW_MSG_OTHER_USER } from '../actions/types';


const initialState = {
  allChats: [],
  chatWith: null,
  singleChat:null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_CHAT:
      return {
        allChats: action.payload
        // {...chat, user: chat.filter(user._id !== action.authId )}
      };
    case SET_CHAT_WITH:
      return {
        ...state,
        chatWith: action.payload
      }


    case GET_A_CHAT:
    case NEW_CHAT:
      return {
        ...state,
        singleChat: action.payload
      }

  
    case NEW_MSG_OTHER_USER:
      return {
        ...state,
        allChats: state.allChats.map(c =>
        c._id === action.chatId
            ? { ...c, message: action.message}
            : c
        )
    }

    case  ADD_CHAT_MSG:
      return {
        ...state
        // singleChat: action.payload
      };

    
     


    

    default:
      return state;
  }
}