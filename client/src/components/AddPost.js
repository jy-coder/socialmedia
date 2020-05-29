import React, {useState, useEffect} from 'react'
import './AddPost.css'
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/postActions';
import { clearErrors } from '../flux/actions/errorActions';
import {makeStyles, TextField,DialogContent,DialogActions, Button, Box} from '@material-ui/core';





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


export function AddPost({addItem, error_data, posts_data,handleClose}) {
  const classes = useStyles();

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
    
    addItem(form);

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
      {error_data.msg.error? <div className="error-msg"><small>{error_data.msg.error}</small></div> : null}
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

const mapStateToProps = (state) =>({
  posts_data:state.posts_data,
  error_data: state.error_data

})

export default connect(mapStateToProps, {addItem, clearErrors})(AddPost)
