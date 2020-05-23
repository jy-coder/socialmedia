import React,{useEffect} from 'react'
import {getuserPost,getotheruserInfo} from '../flux/actions/postActions'
import {connect} from 'react-redux'
import Post from './Post'
import './UserInfo.css'
import {Image} from 'react-bootstrap'

export function UserInfo({getuserPost, posts_data,match,auth,getotheruserInfo}) {

  let noOfFollowers;
  let noOfFollowing;
  let noOfPosts;
  let username;
  let userphoto;


  if(posts_data.userInfo[0]){
   noOfFollowers=posts_data.userInfo[0].followers.length
   noOfFollowing = posts_data.userInfo[0].following.length
   username = posts_data.userInfo[0].name
   userphoto = posts_data.userInfo[0].photo
  }

  if(posts_data.userPost){
    noOfPosts = posts_data.posts.length

  }  

    useEffect(() => {
      if(auth.isAuthenticated){
      getuserPost(match.params.id)
      getotheruserInfo(match.params.id)
    

      }
       
      }, [getuserPost,auth,getotheruserInfo])






    return (
      <>
      <div className = "profile">
        <div className="profile-image">
            <Image src={'/' + userphoto}  roundedCircle  style={{width: '100px'}}/>
        </div>
      
        <div className="profile-name-follow">
          <div className="username-follow">
            <div><b> {username} </b></div>
            <div><button>Follow</button></div>
          </div>
            <div className="profile-stats">
              <div className="profile-stat-count">{noOfPosts} posts</div>
              <div className="profile-stat-count">{noOfFollowers} followers </div>
              <div className="profile-stat-count">{noOfFollowing} following</div>
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
  
  export default connect(mapStateToProps,{getuserPost,getotheruserInfo})(UserInfo)
