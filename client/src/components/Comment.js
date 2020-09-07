import React from 'react'
import {uncommentPost} from '../flux/actions/postActions'
import {connect} from 'react-redux'
import { makeStyles, Grid, Paper,Typography,ButtonBase, Button,Avatar} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth:'100%',
      maxHeight: 100,
      marginBottom: '15px'
    },
    image: {

        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
        display:"none"
        },
        [theme.breakpoints.up('sm')]: {
          height:"50px", 
          width:"50px"
        }
   
  
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    comment:{
      position:'relative',
      minWidth: '180px'
    }
  }));

export function Comment({comment, postId, uncommentPost,auth}) {
  dayjs.extend(relativeTime)
    let belongToCurrentUser;

    if(auth.user){
    if(comment.postedBy._id === auth.user._id)
        belongToCurrentUser = true
    }
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ButtonBase className={classes.image}>
              <Avatar/>
            </ButtonBase>
          </Grid>
          <Grid item xs={8}  container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container direction="row">
                <Grid item xs >
                    <Typography variant="body2" gutterBottom className={classes.comment}>
                    <a href={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</a> &nbsp; <Typography variant="caption"> {dayjs(comment.created).fromNow()} </Typography>
                    </Typography>
                    <Typography variant="body2"  color="textSecondary">
                    {comment.text}
                    </Typography>
                </Grid>
                <Typography variant="body2"  style={{ cursor: 'pointer' }}>
                  {belongToCurrentUser ? <Button variant="outlined" onClick={()=>uncommentPost(postId, comment._id)}>Remove</Button> :null}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth:state.auth
  
  })

export default connect(mapStateToProps,{uncommentPost})(Comment)
