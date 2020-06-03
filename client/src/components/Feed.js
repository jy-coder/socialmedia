import React, {useEffect} from 'react'
import Post from './Post'
import Chat from './Chat'
import {useSelector, useDispatch} from 'react-redux'
import {getItems,addItem,getFeed, s_newPostByOtherUser,s_delPostByOtherUser,updatePostComment} from '../flux/actions/postActions'
import {updateMe} from '../flux/actions/authActions'
import {clearErrors} from '../flux/actions/errorActions'
import {CustomModal } from './CustomModal'
import {makeStyles,Grid } from '@material-ui/core';
import openSocket from 'socket.io-client'
import {connect} from 'react-redux'


const useStyles = makeStyles((theme) => ({
    content:{
      marginTop:'5px',
      width: '100%'
    }
  }));

function Feed({posts_data,error_data,clearErrors,auth,getFeed,updateMe,updatePostComment}) {
  const {posts} = posts_data
  const socket = openSocket('http://localhost:1337');
  // let posts_data = useSelector(state => state.posts_data)
  // let auth= useSelector(state => state.auth)
  // let dispatch = useDispatch()
  // console.log(auth)
     //post is object containing posts obj -> contains status and array of data and loading
     const classes = useStyles();
      useEffect(() => {
          getFeed()

        socket.on(`${auth.user._id}`, data => {
          if(data.action === "add")
           s_newPostByOtherUser(data.posts)
          if(data.action === "delete")
            s_delPostByOtherUser(data.postId)
        
           
     })         
        }, [auth.isAuthenticated,getFeed,updateMe])
      
        useEffect(() => {
          posts.forEach(async (post) => {   
                socket.on(post._id,data =>{
                    if(data.action === "updatepostcomment")
                       updatePostComment(post._id,data.posts.comments)
            })
          })
        },[])
         

    return (
        <>
        <Grid className="feed" >
        {auth.isAuthenticated? <CustomModal status={"add"}/>:null}
            {posts? posts.map((props, i)=>(<Post key={i} {...props}/>)) : null}
        </Grid>
        </>
    )
}




const mapStateToProps = (state) =>({
  posts_data:state.posts_data,
  error_data: state.error_data,
  auth: state.auth

})

export default connect(mapStateToProps, {getItems,clearErrors,addItem,getFeed,updateMe,updatePostComment})(Feed)
