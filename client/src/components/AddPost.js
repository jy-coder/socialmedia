import React, {useState, useEffect} from 'react'
import './AddPost.css'
import { addItem } from '../flux/actions/postActions';
import {makeStyles, TextField,DialogContent,DialogActions, Button, Box} from '@material-ui/core';
import {useDispatch} from 'react-redux'




const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      height: '30ch',
      display: 'block'
    },
  },

  content:{
    marginTop:'5px',
    width: '100%'
  }
}));


export function AddPost({handleClose}) {
  const classes = useStyles();
  const dispatch = useDispatch();


  // console.log(posts_data)
  const [content, setContent]= useState("")





  const submitHandler = (e) =>{
    e.preventDefault();
    
    dispatch(addItem(content));

    handleClose();

    
  }




const inputChangeHandler  = e  => {
    setContent(e.target.value);
  }




    return (
      <section>
      <form onSubmit={(e) => submitHandler(e)} className={classes.root} >
      <DialogContent>
      <TextField 
          id="content"
          label="Enter Content"
          rows={10}
          placeholder="Enter Content"
          multiline
          fullWidth
          onChange={inputChangeHandler}
        />
    
      </DialogContent>
      <DialogActions>
          <Button autoFocus type="submit" color="primary" >
            Add
          </Button>
        </DialogActions>
      </form>
        </section>
    )
}


export default AddPost
