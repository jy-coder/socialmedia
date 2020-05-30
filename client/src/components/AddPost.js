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
  const [image, setImage] = useState("")
  const [content, setContent]= useState("")
  const [preview, setPreview] = useState("")




  const submitHandler = (e) =>{
    e.preventDefault();
    // console.log(content,image)
    const form = new FormData();

    form.append('content', content);
    form.append('photo', image)
    
    dispatch(addItem(form));

    handleClose();

    
  }



  const imageHandler = e =>{
    if(e.target.files[0]){
    let file = e.target.files[0]
    setImage(file);
  
    URL.revokeObjectURL(preview);
    let url = URL.createObjectURL(file);
    setPreview(url)
    }
}

const inputChangeHandler  = e  => {
    setContent(e.target.value);
  }




    return (
      <section>
      <form onSubmit={(e) => submitHandler(e)} className={classes.root} >
      <DialogContent>
      <Box flexDirection="column" p={1}>
        <Box>
          <input type="file" accept='photo/*' name="photo" onChange={imageHandler}/>
        </Box>
      <Box>
        <img src={preview} id="create-post-image" alt="" style={{width: "100px"}}/>
      </Box>
      <Box>
      <TextField 
          id="content"
          label="Enter Content"
          rows={10}
          placeholder="Enter Content"
          multiline
          fullWidth
          onChange={inputChangeHandler}
        />
      </Box>
      </Box>
      </DialogContent>
      <DialogActions>
          <Button autoFocus type="submit" color="primary" >
            Save changes
          </Button>
        </DialogActions>
      </form>
        </section>
    )
}


export default AddPost
