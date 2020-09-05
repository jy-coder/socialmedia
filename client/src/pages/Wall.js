import React, { useEffect } from 'react'
import Post from './../components/Post'
import './Wall.css'
import {connect} from 'react-redux'
import {getMyPost,updatePostComment} from '../flux/actions/postActions'
import {updateFollower} from '../flux/actions/authActions'
import FollowModal from './../components/FollowModal'
import {makeStyles,Grid, Paper,Typography,ButtonBase, Button,Avatar } from '@material-ui/core';
import socket from './../utils/socket'



const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(1),

        margin: '0 auto',
     
      
    },
  
    content:{
      marginTop:'5px',
      width: '100%',
      
    },

    root2: {
        flexGrow: 1,
        // minWidth: '768px'
      },
      paper: {
        padding: theme.spacing(2),
        marginTop: '10px',
        margin: '0 auto'
      
      },
      hide: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          height:"50px", 
          width:"50px"
        },
        [theme.breakpoints.up('sm')]: {
          height:"125px", 
          width:"125px"
        }
      }
      
  }));




function Wall({auth,getMyPost, posts_data,updateFollower,updatePostComment}) {

    const {posts} = posts_data
    const classes = useStyles();
    let listOfFollowing = []
    let listOfFollowers = []
    let noOfFollowers,noOfFollowing,noOfPosts,username,userphoto
   if(auth.user){
      noOfFollowers = auth.user.followers.length
      noOfFollowing  = auth.user.following.length
      noOfPosts = posts_data.posts.length
      username = auth.user.name
      userphoto = auth.user.photo
      listOfFollowing = auth.user.following
      listOfFollowers = auth.user.followers
   }
    

useEffect(() => {
        getMyPost()
},[auth.user,getMyPost])

useEffect(() => {
  if(auth.user){
        socket.on(`${auth.user._id}`, data => {
          if(data.action === "updatefollower")
            // console.log(data.user.followers)
            updateFollower(data.user.followers)

           
     })       }   
        }, [])


    useEffect(() => {
      posts.forEach(async (post) => {   
            socket.on(post._id,data =>{
                if(data.action === "updatepostcomment")
                    updatePostComment(post._id,data.posts.comments)
        })
      })
    },[])


       
    



    return (
<div className="feed">

<div className={classes.root2}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item  xs={4}>
            <ButtonBase >
              <Avatar variant="square" className={classes.hide} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container  spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h4">
                {username}
                </Typography>
              </Grid>
              <Grid item xs={12} sm container direction="row"  >
                <Grid item xs={12} sm={4}  ><Button disabled>{noOfPosts} posts</Button></Grid>
                <Grid item xs={12} sm= {4}  > <FollowModal status={"followers"} len = {noOfFollowers} list={listOfFollowers} title="follower(s)"/></Grid>
                <Grid item xs={12}  sm={4} ><FollowModal status={"following"} len = {noOfFollowing} list={listOfFollowing} title="following"/></Grid>
               
           
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
        
        <Grid className={classes.root} >
            {posts.map((props, i)=>(<Post key={i} {...props}/>))}
        </Grid>
        </div>
    )
}

const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth

})

export default connect(mapStateToProps, {getMyPost,updateFollower,updatePostComment})(Wall)
