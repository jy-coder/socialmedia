import React,{useEffect} from 'react'
import {getuserPost,getotheruserInfo, followUser, unfollowUser} from '../flux/actions/postActions'
import {removeMyFollowing,addMyFollowing} from '../flux/actions/authActions'
import {getAChat} from './../flux/actions/chatAction'
import {connect} from 'react-redux'
import Post from './Post'
import './UserInfo.css'
import FollowModal from './FollowModal'
import {makeStyles,Grid, Paper,Typography,ButtonBase, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(1),
      margin: '0 auto',
   
    
  },

  content:{
    marginTop:'5px',
    width: '100%',
    
  },

  root2: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '0 auto',
    
    }
}));



export function UserInfo({getuserPost, posts_data,match,auth,getotheruserInfo,followUser,unfollowUser,removeMyFollowing,addMyFollowing,getAChat}) {
  // console.log(posts_data.userInfo)
  const {posts} = posts_data

  const classes = useStyles();
  let listOfFollowing;
  let listOfFollowers;
  let noOfFollowers;
  let noOfFollowing;
  let noOfPosts;
  let username;
  let userphoto;
  let followed;
  let userId;
  



  if(posts_data.userInfo){
   noOfFollowers=posts_data.userInfo.followers.length
   noOfFollowing = posts_data.userInfo.following.length
   username = posts_data.userInfo.name
   userphoto = posts_data.userInfo.photo
   listOfFollowing = posts_data.userInfo.following
   listOfFollowers = posts_data.userInfo.followers
   userId = posts_data.userInfo._id
   if(listOfFollowers.find(x => x._id === auth.user._id)){
    followed = true;

   }
   
  }


  if(posts_data.userPost){
    noOfPosts = posts_data.posts.length

  }  

    useEffect(() => {
  
      getuserPost(match.params.id)
      getotheruserInfo(match.params.id)

    
       
      }, [getuserPost,getotheruserInfo])


      const handleunFollow = (userId,auth_user) =>{
        unfollowUser(userId, auth_user);
        removeMyFollowing(userId)
      }


      const handleFollow = (userId,auth_user,user) =>{
        followUser(userId, auth_user);
        addMyFollowing(user)
      }




      
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
                {username} <Button onClick={() => {followed ? handleunFollow(userId,auth.user):handleFollow(userId, auth.user,posts_data.userInfo)}}>{followed ? "UNFOLLOW": "FOLLOW"}</Button>
                <Button onClick={() => getAChat(userId)}>CHAT</Button>
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
    auth:state.auth
  
  })
  
  export default connect(mapStateToProps,{getuserPost,getotheruserInfo,followUser, unfollowUser,removeMyFollowing,addMyFollowing,getAChat})(UserInfo)
