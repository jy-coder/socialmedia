import React, { useEffect } from 'react'
import Post from './Post'
import {connect} from 'react-redux'
import {getMyPost} from '../flux/actions/postActions'
import {clearErrors} from '../flux/actions/errorActions'
import { Image } from 'react-bootstrap'
import FollowModal from './FollowModal'


function Wall({auth,getMyPost, posts_data}) {
    let listOfFollowing = []
    let listOfFollowers = []
    let noOfFollowers
    let noOfFollowing
    let noOfPosts
    let username
    let userphoto;
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
    if(auth.isAuthenticated)
        getMyPost()         
        }, [auth.isAuthenticated,getMyPost])


        const {posts} = posts_data


    return (
        <>

        <div className = "profile">
        <div className="profile-image">
            <Image src={'/' + userphoto}  roundedCircle />
        </div>
      
        <div className="profile-name-follow">
          <div className="username-follow">
            <div><b> {username} </b></div>
          </div>
            <div className="profile-stats">
              <div className="profile-stat-count">{noOfPosts} posts</div>
              <div className="profile-stat-count"><FollowModal status={"followers"} len = {noOfFollowers} list={listOfFollowers} title="follower(s)"/></div>
              <div className="profile-stat-count"><FollowModal status={"following"} len = {noOfFollowing} list={listOfFollowing} title="following"/></div>
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
