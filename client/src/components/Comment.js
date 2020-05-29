import React from 'react'
import {Card, Button,Form, Image, ListGroup, Col, Row} from 'react-bootstrap';
import Moment from 'react-moment';
import {uncommentPost} from '../flux/actions/postActions'
import {connect} from 'react-redux'
import { makeStyles, Grid, Paper,Typography,ButtonBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth:'100%',
      maxHeight: 50
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
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={'/' +comment.postedBy.photo} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container direction="row">
                <Grid item xs>
                    <Typography variant="body2" gutterBottom>
                    {comment.postedBy.name} <Moment format="DD/MM/YYYY HH:mm">{comment.created}</Moment> 
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    {comment.text}
                    </Typography>
                </Grid>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
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
