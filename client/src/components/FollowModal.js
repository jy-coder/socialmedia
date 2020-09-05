import React from 'react'
import './FollowModal.css'
import { connect } from 'react-redux';
import {Box, Button, Avatar,Dialog,DialogTitle,DialogContent} from '@material-ui/core';







function FollowModal({list,len,title}) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

  };


  return (
    <>
      <Button onClick={handleClickOpen}>
      {len} {title}
      </Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle>{title.toUpperCase()}</DialogTitle>
      <DialogContent dividers>

      {list ? list.map((follower, i)=> <Box  display="flex" flexDirection="row"  key={i}> <Avatar style={{marginRight:'5px',marginBottom:'5px'}}/><a href ={`/user/${follower._id}`} > {follower.name} </a></Box> ) : null}
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
