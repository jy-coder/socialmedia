import React, {useEffect,useState} from 'react'
import {getOneItem, updateItem} from '../flux/actions/postActions'
import { connect } from 'react-redux';
import {makeStyles, DialogContent, Box} from '@material-ui/core';


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




function UpdatePost({getOneItem,updateItem,posts_data,_id, handleClose}) {
    const classes = useStyles();
    const [content, setContent]= useState("")

    useEffect(() => {
      getOneItem(_id)
     
    }, [getOneItem])

    let postName, postPhoto


    if(posts_data.post[0]){
      postName = posts_data.post[0].name
      postPhoto = posts_data.post[0].photo

    }




  
    const submitHandler = (e) =>{
      e.preventDefault();
  
      if(content)
        updateItem(_id,content)

      handleClose()
      
    
      
    }


      
  
  
  const inputChangeHandler  = e  => {
      setContent(e.target.value);
    }


      return (
        <DialogContent>
          <Box flexDirection="column" >
        <form onSubmit={(e) => submitHandler(e)} className={classes.root}>
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
