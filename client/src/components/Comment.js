import React from 'react'
import Moment from 'react-moment';
import {uncommentPost} from '../flux/actions/postActions'
import {connect} from 'react-redux'
import { makeStyles, Grid, Paper,Typography,ButtonBase, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth:'100%',
      maxHeight: 50,
      marginBottom: '15px'
    },
    image: {
      width: 50,
  
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

export function Comment({comment, postId, uncommentPost,auth}) {
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
          <Grid item xs={4}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={'/' +comment.postedBy.photo} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container direction="row">
                <Grid item xs>
                    <Typography variant="body2"  gutterBottom>
                    {comment.postedBy.name} <Moment format="DD/MM/YYYY HH:mm">{comment.created}</Moment> 
                    </Typography>
                    <Typography variant="body2"  color="textSecondary">
                    {comment.text}
                    </Typography>
                </Grid>
                <Typography variant="body2"  style={{ cursor: 'pointer' }}>
                  {belongToCurrentUser ? <Button onClick={()=>uncommentPost(postId, comment._id)}>Remove</Button> :null}
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
