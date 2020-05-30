import React, {useEffect,useState} from 'react'
import {getOneItem, updateItem} from '../flux/actions/postActions'
import { connect } from 'react-redux';
import {makeStyles, TextField,DialogContent,DialogActions, Button, Box} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      height: '100%',
      display: 'block'
    },
  },

  content:{
    marginTop:'5px',
    width: '100%'
  }
}));




function UpdatePost({getOneItem,updateItem,posts_data,_id,error_data, handleClose}) {
    const classes = useStyles();
    const [image, setImage] = useState("")
    const [content, setContent]= useState("")
    const [preview, setPreview] = useState("")
    useEffect(() => {
      getOneItem(_id)
     
    }, [getOneItem])

    let postName
    let postPhoto

    if(posts_data.post[0]){
      postName = posts_data.post[0].name
      postPhoto = posts_data.post[0].photo

    }




  
    const submitHandler = (e) =>{
      e.preventDefault();
  
      const form = new FormData();
      form.append('content', content);
      if(image)
        form.append('photo', image)

      updateItem(_id,form)

      handleClose()
      
    
      
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
        <DialogContent>
          <Box flexDirection="column" >
        <form onSubmit={(e) => submitHandler(e)} className={classes.root}>
        <Box>
          <input type="file" accept='photo/*' name="photo" id="photo" className="form-control-file" onChange={imageHandler}  />
        </Box>
        <Box>
          {preview ? <img src={preview} id="create-post-image" alt="" style={{width: "100px"}}/>:
          <img src={postPhoto} id="create-post-image" alt="" style={{width: "100px"}}/>}
        </Box>
        <Box>
          <textarea id="content" name="content" label="Your content" type="content" className="form-control" onChange={inputChangeHandler} rows={5} defaultValue={postName}  />
        </Box>
        <button type="submit">Post</button>
          </form>
          </Box>
          </DialogContent>
        
   
      )

  }



  
  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data
  
  })
  
  export default connect(mapStateToProps,{getOneItem,updateItem})(UpdatePost)
