import React,{useEffect} from 'react'
import {getuserPost,getotheruserInfo, followUser, unfollowUser} from '../flux/actions/postActions'
import {connect} from 'react-redux'
import Post from './Post'
import './UserInfo.css'
import {Image} from 'react-bootstrap'
import FollowModal from './FollowModal'

export function UserInfo({getuserPost, posts_data,match,auth,getotheruserInfo,followUser,unfollowUser}) {
  // console.log(posts_data.userInfo)
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
      if(auth.isAuthenticated){
      getuserPost(match.params.id)
      getotheruserInfo(match.params.id)
    

      }
       
      }, [getuserPost,auth.isAuthenticated,getotheruserInfo])





      
    return (
      <>
      <div className = "profile">
        <div className="profile-image">
            <Image src={'/' + userphoto}  roundedCircle />
        </div>
      
        <div className="profile-name-follow">
          <div className="username-follow">
            <div><b> {username} </b></div>
          <div>{followed ? <button onClick={() => unfollowUser(userId, auth.user)}>Followed</button> : <button onClick={() =>followUser(userId, auth.user)}> Follow</button>}</div>
          </div>
            <div className="profile-stats">
              <div className="profile-stat-count">{noOfPosts} posts</div>
              <div className="profile-stat-count"><FollowModal status={"followers"} len = {noOfFollowers} list={listOfFollowers} title="follower(s)"/></div>
              <div className="profile-stat-count"><FollowModal status={"following"} len = {noOfFollowing} list={listOfFollowing} title="following"/></div>
          </div>
        </div>
        </div>
    
      <div className="my-feed">
          {posts_data.posts ? posts_data.posts.map((props, i)=>(<Post key={i} {...props}/>)) : null}
      </div>
   
  
    </>
    )
}

const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth:state.auth
  
  })
  
  export default connect(mapStateToProps,{getuserPost,getotheruserInfo,followUser, unfollowUser})(UserInfo)
