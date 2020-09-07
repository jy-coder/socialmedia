import axios from './../../utils/axios-handler'
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



export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('/post')
      .then((res) =>{
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      }).catch(err =>{
        // console.log(err)
      })
    }


  export const getFeed = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('/post/feed')
      .then((res) =>{
        dispatch({
          type: GET_FEED,
          payload: res.data
        })
      }).catch(err =>{
        // console.log(err)
      })
  };



  export const getOneItem = (id) => dispatch => {
    axios
      .get(`/post/${id}`)
      .then((res) =>{
        dispatch({
          type: GET_ONE_ITEM,
          payload: id
        })
      }).catch(err =>{
        // console.log(err)
      })
    }

  export const addItem = (content) => dispatch => {
    axios
      .post('/post/create-post', {content})
      .then(res =>{
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        })

      }).catch((err)=>{
        // console.log(err)
      })
    };


  export const deleteItem = (id) => dispatch => {
    axios
      .delete(`/post/delete-post/${id}`)
      .then(res =>{
    
        dispatch({
          type: DELETE_ITEM,
          payload: id
        })
     
      }).catch((err)=>{
        // console.log(err)
      })
    };



      export const updateItem = (id,content) => dispatch => {
        axios
          .put(`/post/update-post/${id}`,{content})
          .then(res =>{
            console.log(res);
            dispatch({
              type: UPDATE_ITEM,
              payloadid: id,
              payloadres: res.data
            })
          }).catch(err =>{
            // console.log(err)
          })}
       
      



      export const getMyFeed = () => dispatch => {
  
        axios
          .get('/post/user-post')
          .then((res) =>{
            dispatch({
              type: GET_ITEMS,
              payload: res.data
            })
          }).catch(err =>{
            // console.log(err)
          })}



      export const likePost = (postId) => dispatch => {
        axios
          .put('/post/like',{postId})
          .then(res =>{
            dispatch({
              type: LIKE_POST,
              payloadres: res.data,
              payloadid: postId
            })
          }).catch((err)=>{
            // console.log(err)
          })
        };


        
      export const unlikePost = (postId) => dispatch => {
        axios
          .put('/post/unlike',{postId})
          .then(res =>{
            dispatch({
              type: UNLIKE_POST,
              payloadres: res.data,
              payloadid: postId
            })
          }).catch((err)=>{
            // console.log(err)
          })
        };



        export const commentPost = (postId,text) => dispatch => {
          axios
            .put('/post/comment',{ postId: postId, comment: {text:text} })
            .then(res =>{
              dispatch({
                type: COMMENT_POST,
                payloadres: res.data,
                payloadid: postId
              })
            }).catch((err)=>{
              // console.log(err)
            })
          };


          export const uncommentPost = (postId, commentId) => dispatch => {
            axios
              .put('/post/uncomment',{ postId: postId, comment: {_id : commentId} })
              .then(res =>{
                dispatch({
                  type: UNCOMMENT_POST,
                  payloadres: res.data,
                  payloadid: postId
                })
              }).catch((err)=>{
                // console.log(err)
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
              .put('/user/follow',{userId})
              .then(res =>{
                dispatch({
                  type: FOLLOW_USER,
                  payload: authUser
    
                })
              }).catch((err)=>{
                // console.log(err)
              })
            };



            export const unfollowUser = (userId, authUser)=> dispatch => {
              axios
              .put('/user/unfollow',{userId})
              .then(res =>{
                dispatch({
                  type: UNFOLLOW_USER,
                  payload: authUser
    
                })
              }).catch((err)=>{
                // console.log(err)
              })
            };


            export const getuserPost = (userId) => dispatch => {
              axios
                .get(`/post/user-post/${userId}`)
                .then((res) =>{
                  dispatch({
                    type: GET_USER_POST,
                    payload: res.data
                  })
                }).catch(err =>{
                  // console.log(err)
            })
          };


          export const getotheruserInfo = (userId) => dispatch => {
            axios
              .get(`/user/otheruser/${userId}`)
              .then((res) =>{
                dispatch({
                  type: GET_USER_INFO,
                  payload: res.data[0]
                })
              }).catch(err =>{
                // console.log(err)
          })
        };



        export const getMyPost = () => dispatch => {
          axios
            .get(`/post/mypost/`)
            .then((res) =>{
              dispatch({
                type: GET_MY_POST,
                payload: res.data
              })
            }).catch(err =>{
              // console.log(err)
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