import axios from 'axios'
import { 
  GET_ITEMS,GET_ONE_ITEM,ADD_ITEM,
  DELETE_ITEM,UPDATE_ITEM,
  ITEMS_LOADING,UPDATE_POST, 
  SHOW_COMMENT,UNSHOW_COMMENT,
GET_USER_INFO} from './types'
import { returnErrors} from './errorActions'
import history from './../../utils/history'


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('http://127.0.0.1:1337/api/post')
      .then((res) =>{
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      }).catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status)),
        
      )
  };



  export const getOneItem = (id) => dispatch => {
    axios
      .get(`http://127.0.0.1:1337/api/post/${id}`)
      .then((res) =>{
        dispatch({
          type: GET_ONE_ITEM,
          payload: id
        })
      }).catch(err =>{
        if(err.response){
        dispatch(returnErrors(err.response.data, err.response.status))
        }
  })
};

  export const addItem = (item) => dispatch => {
    axios
      .post('http://127.0.0.1:1337/api/post/create-post', item)
      .then(res =>{
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        })

        if(res.status === 200)
          history.go(0)

      }).catch((err)=>{
        if(err.response){
          dispatch(returnErrors(err.response.data, err.response.status))
        }
      })
    };


  export const deleteItem = (id) => dispatch => {
    axios
      .delete(`http://127.0.0.1:1337/api/post/delete-post/${id}`)
      .then(res =>{
        // if(res.status === 200)
        //   history.go(0)
    
        dispatch({
          type: DELETE_ITEM,
          payload: id
        })
     
      }).catch((err)=>{
        if(err.response){
          dispatch(returnErrors(err.response.data, err.response.status))
        }
      })
    };



      export const updateItem = (id,item) => dispatch => {
        axios
          .put(`http://127.0.0.1:1337/api/post/update-post/${id}`,item)
          .then(res =>{
            console.log(res);
            dispatch({
              type: UPDATE_ITEM,
              payloadid: id,
              payloadres: res.data
            })
          }).catch(err =>
              dispatch(returnErrors(err.response.data, err.response.status))
              
  )}
      



      export const getMyFeed = () => dispatch => {
  
        axios
          .get('http://127.0.0.1:1337/api/post/my-post')
          .then((res) =>{
            dispatch({
              type: GET_ITEMS,
              payload: res.data
            })
          }).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)),
            
          )
      };



      export const likePost = (postId) => dispatch => {
        axios
          .put('http://127.0.0.1:1337/api/post/like',{postId})
          .then(res =>{
            dispatch({
              type: UPDATE_POST,
              payloadres: res.data,
              payloadid: postId
            })
          }).catch((err)=>{
            if(err.response){
              dispatch(returnErrors(err.response.data, err.response.status))
            }
          })
        };


        
      export const unlikePost = (postId) => dispatch => {
        axios
          .put('http://127.0.0.1:1337/api/post/unlike',{postId})
          .then(res =>{
            dispatch({
              type: UPDATE_POST,
              payloadres: res.data,
              payloadid: postId
            })
          }).catch((err)=>{
            if(err.response){
              dispatch(returnErrors(err.response.data, err.response.status))
            }
          })
        };



        export const commentPost = (postId,text) => dispatch => {
          axios
            .put('http://127.0.0.1:1337/api/post/comment',{ postId: postId, comment: {text:text} })
            .then(res =>{
              dispatch({
                type: UPDATE_POST,
                payloadres: res.data,
                payloadid: postId
              })
            }).catch((err)=>{
              if(err.response){
                dispatch(returnErrors(err.response.data, err.response.status))
              }
            })
          };


          export const uncommentPost = (postId, commentId) => dispatch => {
            axios
              .put('http://127.0.0.1:1337/api/post/uncomment',{ postId: postId, comment: {_id : commentId} })
              .then(res =>{
                dispatch({
                  type: UPDATE_POST,
                  payloadres: res.data,
                  payloadid: postId
                })
              }).catch((err)=>{
                if(err.response){
                  dispatch(returnErrors(err.response.data, err.response.status))
                }
              })
            };
  
            
            export const showComment = (postId)=> dispatch => {
              dispatch({
                type: SHOW_COMMENT,
                payload: postId
              })
            }


            export const unshowComment = (postId)=> dispatch => {
              dispatch({
                type: UNSHOW_COMMENT,
                payload: postId
              })
            }


            export const getuserInfo = (userId) => dispatch => {
              console.log(userId)
              axios
                .get(`http://127.0.0.1:1337/api/post/my-post/${userId}`)
                .then((res) =>{
                  console.log(res)
                  dispatch({
                    type: GET_USER_INFO,
                    payload: res.data
                  })
                }).catch(err =>{
                  if(err.response){
                  dispatch(returnErrors(err.response.data, err.response.status))
                  }
            })
          };
      


  export const setItemsLoading = () =>{
      return{
          type:ITEMS_LOADING
      }
  }