import React,{useState} from 'react'
import './FollowModal.css'
import { connect } from 'react-redux';
import {Button, IconButton,Typography, Dialog,DialogTitle,DialogContent,DialogActions} from '@material-ui/core';
 import MuiDialogTitle from '@material-ui/core/DialogTitle';
 import {Close, Delete,Edit} from '@material-ui/icons';


function FollowModal({status, list,len,title,auth}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // if(error_data)
    //         clearErrors()
  };


  return (
    <>
      <Button onClick={handleClickOpen}>
      {len} {title}
      </Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle>{title.toUpperCase()}</DialogTitle>
      <DialogContent dividers>

      <ul>{list ? list.map((follower, i)=> <li key={i}> <img src = {'/' + follower.photo} /> <a href ={`/user/${follower._id}`} > {follower.name} </a></li> ) : null}</ul>
      </DialogContent>
      </Dialog>
    </>
  );
}



const mapStateToProps = (state) =>({
  posts_data:state.posts_data,
  error_data: state.error_data,
  auth:state.auth

})


export default connect(mapStateToProps)(FollowModal)
