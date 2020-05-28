import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM,
    GET_ONE_ITEM,ITEMS_LOADING,LIKE_POST,
    UNLIKE_POST,
    COMMENT_POST,
    UNCOMMENT_POST, SHOW_COMMENT, UNSHOW_COMMENT,GET_USER_INFO,
    GET_FEED,GET_USER_POST,GET_MY_POST,FOLLOW_USER,UNFOLLOW_USER,
    GET_CHAT, CLOSE_CHAT,ADD_CHAT, OPEN_CHAT, CHAT_WITH,S_ADD_CHAT} from '../actions/types'
const initialState={
    posts: [],
    post: {},
    userPost:[],
    userInfo: null,
    loading:false,
    chat: [],
    chatId: "",
    openChat: false,
    chatWithId:""

}

export default function(state=initialState,action){
    switch(action.type){
        case GET_FEED:
        case GET_ITEMS:
        case GET_MY_POST:
            // console.log(action.payload)
            return{
                ...state,
                posts: action.payload,
                loading:false
            };
        case GET_ONE_ITEM:
            return{
                ...state,
                post: state.posts.filter((post) => post._id === action.payload)
                
            };

        
        case ADD_ITEM:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
           
               
            };


        case DELETE_ITEM:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            };



        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            }
        
            case UPDATE_ITEM:
                return {
                    ...state,
                    posts: state.posts.map(p =>
                    p._id === action.payloadid
                        ? { ...p, ...action.payloadres}
                        : p
                    )
                }
            case LIKE_POST:
            case UNLIKE_POST:
            case COMMENT_POST:
            case UNCOMMENT_POST:
            return {
                ...state,
                posts: state.posts.map(p =>
                p._id === action.payloadid
                    ? { ...p, ...action.payloadres }
                    : p
                )
            }

        case SHOW_COMMENT:
            return {
                ...state,
                posts: state.posts.map(p =>
                p._id === action.payload
                    ? { ...p, show:true}
                    : p
                )
            }


    case UNSHOW_COMMENT:
        return {
            ...state,
            posts: state.posts.map(p =>
            p._id === action.payload
                ? { ...p, show:false}
                : p
            )
        }
            
        case GET_USER_POST:
            return{
                ...state,
                posts: action.payload
                
            };

        case GET_USER_INFO:
            // console.log(action.payload)
            return{
                ...state,
                userInfo: action.payload
                
            };

        case FOLLOW_USER:
            return{
                ...state,
                userInfo : {...state.userInfo, followers:[...state.userInfo.followers, action.payload]}
            }
        case UNFOLLOW_USER:        
            return{
                ...state,
                userInfo : {...state.userInfo, followers: state.userInfo.followers.filter(p => p._id !== action.payload._id )}
            }
        case GET_CHAT:
            return{
                ...state,
                chat: action.payload,
                chatId: action.payloadchatId
            }

        case OPEN_CHAT:
            return{
                ...state,
                openChat: true
            }
        
        case CHAT_WITH:
            return{
                ...state,
                chatWithId: action.payload

            }
        
      
        case S_ADD_CHAT:
            return{
                ...state,
                chat: action.payload
               
            }

        
        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            }
        default:
            return state
    }
}