import React, { useEffect } from 'react'
import Post from './Post'
import {connect} from 'react-redux'
import {getMyPost} from '../flux/actions/postActions'
import {clearErrors} from '../flux/actions/errorActions'
import { Image } from 'react-bootstrap'


function Wall({auth,getMyPost, posts_data}) {
    let noOfFollowers
    let noOfFollowing
    let noOfPosts
    let username
    let userphoto;
    if(auth.user){
        noOfFollowers = auth.user.following.length
        noOfFollowing  = auth.user.following.length
        noOfPosts = posts_data.posts.length;
        username = auth.user.name;
        userphoto = auth.user.photo 
    }


useEffect(() => {
    if(auth.isAuthenticated)
        getMyPost()         
        }, [auth,getMyPost])


        const {posts} = posts_data


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
        
        <div className ="my-feed">
            {posts? posts.map((props, i)=>(<Post key={i} {...props}/>)) : null}
        </div>
        </>
    )
}

const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth

})

export default connect(mapStateToProps, {getMyPost})(Wall)
