import React,{useState, useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Button, IconButton,Typography, Dialog} from '@material-ui/core';
 import MuiDialogTitle from '@material-ui/core/DialogTitle';
 import {Close, Delete,Edit} from '@material-ui/icons';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { clearErrors } from '../flux/actions/errorActions'
import AddPost from './AddPost'
import UpdatePost from './UpdatePost'
import DeletePost from './DeletePost'


 const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export  function CustomModal({clearErrors, error_data, status,_id}){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // if(error_data)
    //         clearErrors()
  };


  const Obj = (status) =>{
    switch (status) {
      case 'add':
        return  {btn: <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add Post</Button>, title:<DialogTitle>Add Post</DialogTitle>, component: <AddPost handleClose={handleClose} />}
      case 'update':
        return {btn: <Edit style={{cursor: 'pointer'}} onClick={handleClickOpen}/>,title: <DialogTitle>Update Post </DialogTitle>, component: <UpdatePost _id={_id} handleClose={handleClose}/>}
      case 'delete':
        return {btn: <Delete style={{cursor: 'pointer'}} onClick={handleClickOpen}/>, component: <DeletePost _id={_id} handleClose={handleClose}/>}
      default:
        return null;
  }
}


  const objFinal ={...Obj(status)}

  return (
    <div>
      
      {objFinal.btn}
   
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {objFinal.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          {objFinal.component}
          </Typography>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}






