import React, {useEffect,useState} from 'react'
import {updateMe} from '../../flux/actions/authActions'
import { connect } from 'react-redux';
import history from './../../utils/history'
import { withRouter } from 'react-router-dom';

export function Profile({auth,error_data,updateMe}) {

    const [image, setImage] = useState("")
    const [name, setName]= useState("")
    const [preview, setPreview] = useState("")
    const [defaultPhoto, setDefault] = useState("")

    let myName, myPhoto

    if(auth.user){
        myName = auth.user.name
        myPhoto = auth.user.photo
    }

    // useEffect (() => {},[])


  
    const submitHandler = (e) =>{
      e.preventDefault();
    const form = new FormData();
    if(name)
        form.append('name', name)
    if(image)
        form.append('photo', image)
    if(defaultPhoto)
        form.append('photo', 'default.jpg') //as string
    if(name || image || defaultPhoto){
        updateMe(form)
    }
    
    
       
    }

    

  
    const imageHandler = e =>{
      setDefault("")
      if(e.target.files[0]){
      let file = e.target.files[0]
      setImage(file);
    
      URL.revokeObjectURL(preview);
      let url = URL.createObjectURL(file);
      setPreview(url)
      }
  }
  
  const inputChangeHandler  = e  => {
      setName(e.target.value);
    }

   
      return (
      <section className="auth-form">
      <section className="modal-body">
      {error_data.msg.error? <div className="error-msg"><small>{error_data.msg.error}</small></div> : null}
        <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <label htmlFor="photo">Image:</label>
          <input type="file" accept='photo/*' name="photo" id="photo" className="form-control-file" onChange={imageHandler}  />
          {preview  ? <img src={preview} id="create-post-image" alt="" style={{width: "100px"}}/>: null}
          {!preview && !defaultPhoto ? <img src={"/" + myPhoto} id="create-post-image" alt="" style={{width: "100px"}}/> : null}
          {!preview && defaultPhoto ? <img src={"/" + defaultPhoto} id="create-post-image" alt="" style={{width: "100px"}}/> : null}
        </div>
        <button type="button" onClick={() => {setImage("");setPreview("");setDefault("")}}>Reset</button>
        <button type="button" onClick={() => {setImage("");setPreview(""); setDefault("default.jpg")}}>Remove</button>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" label="Your name" type="name" className="form-control" onChange={inputChangeHandler} defaultValue={myName} />
        </div>
        <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Save change</button>
        </div>
          </form>
          </section>
          </section>
      )
  
  }



  
  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })
  
  export default connect(mapStateToProps,{updateMe})(Profile)
