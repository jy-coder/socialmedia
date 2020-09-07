import React, {useEffect} from 'react'
import Post from './../components/Post'
import {getItems,addItem,getFeed, s_newPostByOtherUser,s_delPostByOtherUser,updatePostComment} from '../flux/actions/postActions'
import {updateMe} from '../flux/actions/authActions'
import {clearErrors} from '../flux/actions/errorActions'
import {CustomModal } from './../components/CustomModal'
import {makeStyles,Grid } from '@material-ui/core';
import {connect} from 'react-redux'



const useStyles = makeStyles((theme) => ({
    content:{
      marginTop:'5px',
      width: '100%'
    },
    main:{
      position:'relative',
      width: '80%',
      margin: 'auto',
      marginTop: '20px'
    }
  }));

function Feed({posts_data,auth,getFeed,updateMe,updatePostComment, s_newPostByOtherUser,s_delPostByOtherUser}) {

  const {posts} = posts_data
  const classes = useStyles()
      useEffect(() => {
          getFeed()

      
      
      }   
        , [auth.isAuthenticated,getFeed])
      
        useEffect(() => {
          const socket = require('./../utils/socket').init()

        if(auth.user){
          socket.on(`${auth.user._id}`, data => {
            if(data.action === "add")
              s_newPostByOtherUser(data.posts)
            if(data.action === "delete")
              s_delPostByOtherUser(data.postId)
              
        })}
          posts.forEach(async (post) => {   
                socket.on(post._id,data =>{
                    if(data.action === "updatepostcomment")
                       updatePostComment(post._id,data.posts.comments)
            })
          })

         
          return () =>{
              socket.disconnect()
            }
        
        },[updateMe,auth.user])


 
         

    return (
        <div className="feed">
          <Grid className={classes.main}>
          {auth.isAuthenticated? <CustomModal status={"add"}/>:null}
              {posts? posts.map((props, i)=>(<Post key={i} {...props}/>)) : null}
          </Grid>
        </div>
    )
}




const mapStateToProps = (state) =>({
  posts_data:state.posts_data,
  error_data: state.error_data,
  auth: state.auth

})

export default connect(mapStateToProps, {getItems,clearErrors,addItem,getFeed,updateMe,updatePostComment, s_newPostByOtherUser,s_delPostByOtherUser})(Feed)
