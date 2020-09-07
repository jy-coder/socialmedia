import React,{useEffect} from 'react'
import {getuserPost,getotheruserInfo, followUser, unfollowUser} from '../flux/actions/postActions'
import {removeMyFollowing,addMyFollowing} from '../flux/actions/authActions'
import {getAChat,createChat} from './../flux/actions/chatAction'
import {connect} from 'react-redux'
import Post from './Post'
import './UserInfo.css'
import FollowModal from './FollowModal'
import {makeStyles,Grid, Paper,Typography,ButtonBase, Button,Avatar } from '@material-ui/core';
import history from './../utils/history'

const useStyles = makeStyles((theme) => ({
  root: {
    
      margin: '0 auto'
   
    
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
      marginTop: '15px'
    
    },
      hide: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          height:"50px", 
          width:"50px"
        },
        [theme.breakpoints.up('sm')]: {
          height:"150px", 
          width:"150px"
        }
      }
}));



export function UserInfo({getuserPost, posts_data,match,auth,getotheruserInfo,followUser,unfollowUser,removeMyFollowing,addMyFollowing,createChat}) {
  // console.log(posts_data.userInfo)
 
  const {posts} = posts_data

  const classes = useStyles();
  let listOfFollowing,listOfFollowers,noOfFollowers,noOfFollowing, noOfPosts, username, userphoto, followed, userId, belongToUser

  if(posts_data.userInfo){
   noOfFollowers=posts_data.userInfo.followers.length
   noOfFollowing = posts_data.userInfo.following.length
   username = posts_data.userInfo.name
   userphoto = posts_data.userInfo.photo
   listOfFollowing = posts_data.userInfo.following
   listOfFollowers = posts_data.userInfo.followers
   userId = posts_data.userInfo._id
   if(auth.user){
   if(listOfFollowers.find(x => x._id === auth.user._id)){
    followed = true;
    belongToUser = match.params.id === auth.user._id

   }
   }
   
   
  }


  if(posts_data.userPost){
    noOfPosts = posts_data.posts.length

  }  

    useEffect(() => {
  
      getuserPost(match.params.id)
      getotheruserInfo(match.params.id)

    
       
      }, [getuserPost,getotheruserInfo,match.params.id])


      const handleunFollow = (userId,auth_user) =>{
        unfollowUser(userId, auth_user);
        removeMyFollowing(userId)
      }


      const handleFollow = (userId,auth_user,user) =>{
        followUser(userId, auth_user);
        addMyFollowing(user)
      }

const renderOptions = () =>{
if(!belongToUser && auth.isAuthenticated)
return(
<Typography gutterBottom variant="h4">
  {username} <Button onClick={() => {followed ? handleunFollow(userId,auth.user):handleFollow(userId, auth.user,posts_data.userInfo)}}>{followed ? "UNFOLLOW": "FOLLOW"}</Button>
  <Button onClick={handleClick}>CHAT</Button>
  </Typography>
  )
else
  return (
  <Typography gutterBottom variant="h4">{username}</Typography>
  )
  
}


const handleClick = () => {
  createChat(userId)
  setTimeout(() => {
    history.push('/chat')
  }, 5000);
  
}

      
    return (
        <div className="feed">

<div className={classes.root2}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <ButtonBase>
              <Avatar  variant="square" className={classes.hide}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container  spacing={2}>
              <Grid item xs={12}>
                {renderOptions()}
              </Grid>
              <Grid item xs={12} sm container direction="row"  >
                <Grid item xs={12}  sm= {4}><Button disabled>{noOfPosts} posts</Button></Grid>
                <Grid item xs={12} sm= {4}> <FollowModal status={"followers"} len = {noOfFollowers} list={listOfFollowers} title="follower(s)"/></Grid>
                <Grid item xs={12}  sm= {4}><FollowModal status={"following"} len = {noOfFollowing} list={listOfFollowing} title="following"/></Grid>
               
           
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
  
  export default connect(mapStateToProps,{getuserPost,getotheruserInfo,followUser, unfollowUser,removeMyFollowing,addMyFollowing,createChat})(UserInfo)
