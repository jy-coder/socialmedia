import React, {useState,useEffect} from 'react'

// import './Post.css'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import { CustomModal}  from './CustomModal'
import {likePost,unlikePost,commentPost, showComment,unshowComment,updatePostComment } from '../flux/actions/postActions'
import Comment  from './Comment'

import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import { makeStyles, Card,CardHeader, CardMedia,CardContent,CardActions, 
  Collapse, Avatar, IconButton, Typography, FormControl, Input, Button,Box} from '@material-ui/core';
import {Favorite, Share,ExpandMore, MoreVert} from '@material-ui/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client'




const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: '100%',
    maxHeight: '50%',
    width: '100%',
    marginTop: '1rem'

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  comment:{
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'center'
  }

}));



function Post(props) {
  dayjs.extend(relativeTime)
  const [comment,setComment]= useState('')
  let liked;
  let belongToCurrentUser;
  let commentsCount;
 
  commentsCount = props.comments.length;
   
  
  if(props.auth.user){
    if(props.likes.find(x => x._id === props.auth.user._id))
      liked = true;
    if(props.creator._id === props.auth.user._id)
      belongToCurrentUser = true
  }

    

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


    
    const inputChangeHandler  = e  => {
      setComment(e.target.value);
    }
    
  
    
      return (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />  
              </IconButton>
            }
            title={<a href={!belongToCurrentUser ? `/user/${props.creator._id}`:null}>{props.creator.name}</a>}
            subheader={dayjs(props.createdAt).fromNow()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {props.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={()=>{liked ? props.unlikePost(props._id): props.likePost(props._id) }}>
             <Favorite  style={{color: liked ? "red" : "grey"}} />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
            {belongToCurrentUser?
            <>
            <IconButton aria-label="delete">
            <CustomModal status={"delete"} _id={props._id}/>
            </IconButton>
            <IconButton aria-label="update">
            <CustomModal status={"update"} _id={props._id}/>
            </IconButton>
            </>:null}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography component={'div'}>
              {props.comments? props.comments.map((comment, i)=>(<Comment key={i} postId={props._id}  comment={comment}/>)) : null}
              </Typography>
           
              <Box flexDirection="row" className={classes.comment} > 
              <Box width="75%"><Input  placeholder="Comment on the post"  onChange={inputChangeHandler} fullWidth/></Box>
              <Box ><Button variant="contained" color="primary" onClick={()=>props.commentPost(props._id,comment)}  >Comment</Button></Box>
              </Box>
   
            </CardContent>
          </Collapse>
        </Card>
      );
    }


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })
  
  export default connect(mapStateToProps,{likePost,unlikePost,commentPost, showComment,unshowComment,updatePostComment })(Post)



