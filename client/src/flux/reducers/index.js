import { combineReducers } from 'redux'
import postReducer from './postReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import chatReducer from './chatReducer'
import userReducer from './userReducer'


export default combineReducers({
    posts_data:postReducer,
    error_data:errorReducer,
    auth:authReducer,
    chat: chatReducer,
    user: userReducer
})
