import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM,
    GET_ONE_ITEM,ITEMS_LOADING,UPDATE_POST, SHOW_COMMENT, UNSHOW_COMMENT,GET_USER_INFO } from '../actions/types'
const initialState={
    posts: [],
    post: {},
    userInfo:{},
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_ITEMS:
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
                posts: [action.payload, ...state.posts]
               
            };


        case DELETE_ITEM:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            };


        case UPDATE_ITEM:
            let oldPost = state.posts.filter((post) => post._id !== action.payloadid)
            return {
                ...state,
                posts: [action.payloadres,...oldPost]
            };


        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            }
        
        case UPDATE_POST:
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
            
        case GET_USER_INFO:
            console.log('get user info triggered')
            console.log(action.payload)
            return{
                ...state,
                userInfo: action.payload
                
            };

        
        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            }
        default:
            return state
    }
}