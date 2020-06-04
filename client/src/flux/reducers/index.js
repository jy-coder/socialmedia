import { combineReducers } from 'redux'
import postReducer from './postReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import chatReducer from './chatReducer'


export default combineReducers({
    posts_data:postReducer,
    error_data:errorReducer,
    auth:authReducer,
    chat: chatReducer
})
