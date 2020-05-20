import React, {useState, useEffect} from 'react'
import './AddPost.css'
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/postActions';
import { clearErrors } from '../flux/actions/errorActions';

export function AddPost({addItem, error_data, handleClose}) {
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
      <section className="modal-body">
      {error_data.msg.error? <div className="error-msg"><small>{error_data.msg.error}</small></div> : null}
      <form onSubmit={(e) => submitHandler(e)}>
      <div className="form-group">
        <label htmlFor="name">Image:</label>
        <input type="file" accept='photo/*' name="photo" className="form-control-file" onChange={imageHandler} />
        <img src={preview} id="create-post-image" alt="" style={{width: "100px"}}/>
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" label="Your content" type="content" className="form-control" onChange={inputChangeHandler} rows={5} />
      </div>
      <div className="modal-footer">
      <button type="submit" className="btn btn-primary">Post</button>
      </div>
        </form>
        </section>
    )
}

const mapStateToProps = (state) =>({
  posts_data:state.posts_data,
  error_data: state.error_data

})

export default connect(mapStateToProps, {addItem, clearErrors})(AddPost)
