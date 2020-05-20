import { combineReducers } from 'redux'
import postReducer from './postReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    posts_data:postReducer,
    error_data:errorReducer
})
