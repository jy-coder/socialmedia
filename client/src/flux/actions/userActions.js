import axios from './../../utils/axios-handler'
import { 
GET_ALL_USERS
} from './types'



export const getAllUsers = () => dispatch => {
    axios
      .get('/user/getAllUsers')
      .then((res) =>{
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data
        })
      }).catch(err =>{

      })
  };