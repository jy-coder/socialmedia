import React, {useEffect,useState} from 'react'
import {getOneItem, updateItem} from '../flux/actions/postActions'
import { connect } from 'react-redux';

function UpdatePost({getOneItem,updateItem,posts_data,_id,error_data, handleClose}) {

    const [image, setImage] = useState("")
    const [content, setContent]= useState("")
    const [preview, setPreview] = useState("")

  
    const submitHandler = (e) =>{
      e.preventDefault();
  
      const form = new FormData();
      form.append('content', content);
      if(image)
        form.append('photo', image)

      updateItem(_id,form)

      handleClose()
      
    
      
    }

    const {post} = posts_data

    useEffect(() => {
        getOneItem(_id)
       
      }, [getOneItem])
      
    
  
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

    if(post[0])
      return (
          <div>
      <section className="modal-body">
      {error_data.msg.error? <div className="error-msg"><small>{error_data.msg.error}</small></div> : null}
        <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <label htmlFor="name">Image:</label>
          <input type="file" accept='photo/*' name="photo" id="photo" className="form-control-file" onChange={imageHandler}  />
          {preview ? <img src={preview} id="create-post-image" alt="" style={{width: "100px"}}/>:
          <img src={post[0].photo} id="create-post-image" alt="" style={{width: "100px"}}/>}
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" label="Your content" type="content" className="form-control" onChange={inputChangeHandler} rows={5} defaultValue={post[0].content}  />
        </div>
        <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Post</button>
        </div>
          </form>
          </section>
          </div>
      )
      else
      return (null);
  }



  
  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data
  
  })
  
  export default connect(mapStateToProps,{getOneItem,updateItem})(UpdatePost)
