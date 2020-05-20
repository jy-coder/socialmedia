import React, {useEffect} from 'react'
import './Posts.css'
import Post from './Post'
import {connect} from 'react-redux'
import {getMyFeed} from '../flux/actions/postActions'
import {clearErrors} from '../flux/actions/errorActions'

function MyFeed({posts_data,getMyFeed,error_data,clearErrors}) {
     //post is object containing posts obj -> contains status and array of data and loading

    useEffect(() => {
        getMyFeed()
       
      }, [getMyFeed])


       //get status and array of data
        const {posts} = posts_data
        // console.log(posts);

    return (
        <div className="my-feed">
        <div className="create-post">
        </div>
            {posts.data? posts.data.map((props, i)=>(<Post key={i} {...props}/>)) : null}
        </div>
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data

})

export default connect(mapStateToProps, {getMyFeed,clearErrors})(MyFeed)
