import React, {useEffect} from 'react'
import Post from './Post'
import Chat from './Chat'
import {useSelector, useDispatch} from 'react-redux'
import {getItems,addItem,getFeed} from '../flux/actions/postActions'
import {updateMe} from '../flux/actions/authActions'
import {clearErrors} from '../flux/actions/errorActions'
import {CustomModal } from './CustomModal'
import {makeStyles,Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  
    content:{
      marginTop:'5px',
      width: '100%'
    }
  }));

function Feed() {

  let posts_data = useSelector(state => state.posts_data)
  let auth= useSelector(state => state.auth)
     //post is object containing posts obj -> contains status and array of data and loading
     const classes = useStyles();
      useEffect(() => {
        if(auth.isAuthenticated)
            getFeed()         
            }, [auth.isAuthenticated,getFeed,updateMe])
      


       //get status and array of data
        const {posts} = posts_data
        // console.log(posts);

    return (
        <>
        <Grid className="feed" >
        {auth.isAuthenticated? <CustomModal status={"add"}/>:null}
            {posts? posts.map((props, i)=>(<Post key={i} {...props}/>)) : null}
        </Grid>
        {/* <Chat/> */}
        </>
    )
}




export default Feed
