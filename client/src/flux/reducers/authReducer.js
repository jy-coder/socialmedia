import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_MY_PROFILE,
    NO_USER,REMOVE_MY_FOLLOWING,
    ADD_MY_FOLLOWING,UPDATE_FOLLOWER
}from '../actions/types';


const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user:null

}

export default function(state = initialState,action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
              }
            case UPDATE_MY_PROFILE:
                return{
                    ...state,
                    isAuthenticated:true,
                    isLoading:false,
                    user: action.payload
                  }
            case USER_LOADED:
                return{
                    ...state,
                    isAuthenticated:true,
                    isLoading:false,
                    user: action.payload
                  }
            case LOGIN_SUCCESS:
                return{
                    ...state,
                    isAuthenticated:true,
                    isLoading:false,
                    user: action.payload
                  }
            case REGISTER_SUCCESS:
                return{
                    ...state,
                    ...action.payload,
                    isAuthenticated:false,
                    isLoading:false,
                    
                  }
            case NO_USER:
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case LOGOUT_SUCCESS:
            case REGISTER_FAIL:
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading: false
            }
            case REMOVE_MY_FOLLOWING:
                return{
                    ...state,
                    user : {...state.user, following: state.user.following.filter(p => p._id !== action.payload )}
                }
            case ADD_MY_FOLLOWING:
                return{
                    ...state,
                    user : {...state.user, following: [...state.user.following,action.payload]}
                }


            case UPDATE_FOLLOWER:
                return{
                    ...state,
                    user : {...state.user, followers: action.payload}
                }

            

   
            default:
                return state
    }
}