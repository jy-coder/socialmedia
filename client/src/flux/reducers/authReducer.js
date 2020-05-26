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
    NO_USER
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

            

   
            default:
                return state
    }
}