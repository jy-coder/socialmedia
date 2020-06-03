import React, { useEffect } from 'react'
import Post from './Post'
import './Wall.css'
import {connect} from 'react-redux'
import {getMyPost} from '../flux/actions/postActions'
import {updateFollower} from '../flux/actions/authActions'
import {clearErrors} from '../flux/actions/errorActions'
import FollowModal from './FollowModal'
import {makeStyles,Grid, Paper,Typography,ButtonBase, Button } from '@material-ui/core';
import openSocket from 'socket.io-client'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        // width: '50%',
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
        // width: '50%',
        margin: '0 auto',
      
      }
  }));




function Wall({auth,getMyPost, posts_data,updateFollower}) {

    const classes = useStyles();
    let listOfFollowing = []
    let listOfFollowers = []
    let noOfFollowers
    let noOfFollowing
    let noOfPosts
    let username
    let userphoto;
   
      noOfFollowers = auth.user.followers.length
      noOfFollowing  = auth.user.following.length
      noOfPosts = posts_data.posts.length
      username = auth.user.name
      userphoto = auth.user.photo
      listOfFollowing = auth.user.following
      listOfFollowers = auth.user.followers
    

useEffect(() => {
        getMyPost()
        const socket = openSocket('http://localhost:1337');
        socket.on(`${auth.user._id}`, data => {
          if(data.action === "updatefollower")
            // console.log(data.user.followers)
            updateFollower(data.user.followers)

           
     })          
        }, [getMyPost])


        const {posts} = posts_data
    



    return (
        <div className="feed">

<div className={classes.root2}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <ButtonBase>
              <img  alt="complex" src={'/' + userphoto} className="profile-img" />
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
                <Grid item xs={12} sm={4} md={4} lg={4} ><Button disabled>{noOfPosts} posts</Button></Grid>
                <Grid item xs={12} sm= {4} md={4} lg={4} > <FollowModal status={"followers"} len = {noOfFollowers} list={listOfFollowers} title="follower(s)"/></Grid>
                <Grid item xs={12}  sm={4} md={4} lg={4}><FollowModal status={"following"} len = {noOfFollowing} list={listOfFollowing} title="following"/></Grid>
               
           
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

export default connect(mapStateToProps, {getMyPost,updateFollower})(Wall)
