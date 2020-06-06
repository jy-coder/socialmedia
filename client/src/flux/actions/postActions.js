import axios from 'axios'
import { 
  GET_ITEMS,GET_ONE_ITEM,ADD_ITEM,
  DELETE_ITEM,UPDATE_ITEM,
  ITEMS_LOADING,LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  UNCOMMENT_POST, 
  SHOW_COMMENT,UNSHOW_COMMENT,
GET_USER_INFO,GET_USER_POST, GET_FEED,
GET_MY_POST,FOLLOW_USER,UNFOLLOW_USER, 
S_NEW_POST,S_DELETE_POST,UPDATE_POST_COMMENT
} from './types'

import { returnErrors} from './errorActions'



export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('http://127.0.0.1:1337/api/post')
      .then((res) =>{
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      }).catch(err =>{
        if(err.response)
          dispatch(returnErrors(err.response.data, err.response.status))
      })
  };


  export const getFeed = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('http://127.0.0.1:1337/api/post/feed')
      .then((res) =>{
        dispatch({
          type: GET_FEED,
          payload: res.data
        })
      }).catch(err =>{
        if(err.response)
          dispatch(returnErrors(err.response.data, err.response.status))
      })
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
          .get('http://127.0.0.1:1337/api/post/user-post')
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
              type: LIKE_POST,
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
              type: UNLIKE_POST,
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
                type: COMMENT_POST,
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
                  type: UNCOMMENT_POST,
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


            export const followUser = (userId, authUser)=> dispatch => {
              axios
              .put('http://127.0.0.1:1337/api/user/follow',{userId})
              .then(res =>{
                dispatch({
                  type: FOLLOW_USER,
                  payload: authUser
    
                })
              }).catch((err)=>{
                if(err.response){
                  dispatch(returnErrors(err.response.data, err.response.status))
                }
              })
            };



            export const unfollowUser = (userId, authUser)=> dispatch => {
              axios
              .put('http://127.0.0.1:1337/api/user/unfollow',{userId})
              .then(res =>{
                dispatch({
                  type: UNFOLLOW_USER,
                  payload: authUser
    
                })
              }).catch((err)=>{
                if(err.response){
                  dispatch(returnErrors(err.response.data, err.response.status))
                }
              })
            };


            export const getuserPost = (userId) => dispatch => {
              axios
                .get(`http://127.0.0.1:1337/api/post/user-post/${userId}`)
                .then((res) =>{
                  dispatch({
                    type: GET_USER_POST,
                    payload: res.data
                  })
                }).catch(err =>{
                  if(err.response){
                  dispatch(returnErrors(err.response.data, err.response.status))
                  }
            })
          };


          export const getotheruserInfo = (userId) => dispatch => {
            axios
              .get(`http://127.0.0.1:1337/api/user/otheruser/${userId}`)
              .then((res) =>{
                dispatch({
                  type: GET_USER_INFO,
                  payload: res.data[0]
                })
              }).catch(err =>{
                if(err.response){
                dispatch(returnErrors(err.response.data, err.response.status))
                }
          })
        };



        export const getMyPost = () => dispatch => {
          axios
            .get(`http://127.0.0.1:1337/api/post/mypost/`)
            .then((res) =>{
              dispatch({
                type: GET_MY_POST,
                payload: res.data
              })
            }).catch(err =>{
              if(err.response){
              dispatch(returnErrors(err.response.data, err.response.status))
              }
        })
      };
      



export const updatePostComment = (id, comments) =>dispatch =>{
  dispatch({
    type:UPDATE_POST_COMMENT,
    id:id,
    comments:comments
  })

}


export const s_newPostByOtherUser = (data) => dispatch => {
  dispatch({
    type:S_NEW_POST,
    payload:data
  })
};


export const s_delPostByOtherUser = (id) => dispatch => {
  dispatch({
    type:S_DELETE_POST,
    payload:id
  })
};







  export const setItemsLoading = () =>{
      return{
          type:ITEMS_LOADING
      }
  }