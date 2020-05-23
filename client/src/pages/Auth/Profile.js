import React, {useEffect,useState} from 'react'
import {updateMe} from '../../flux/actions/authActions'
import { connect } from 'react-redux';
import history from './../../utils/history'

export function Profile({auth,error_data,updateMe}) {

    const [image, setImage] = useState("")
    const [name, setName]= useState("")
    const [preview, setPreview] = useState("")

    let myName, myPhoto

    if(auth.user){
        myName = auth.user.name
        myPhoto = auth.user.photo
    }


  
    const submitHandler = (e) =>{
      e.preventDefault();
        console.log(name,image)
    const form = new FormData();
    if(name)
        form.append('name', name)
    if(image)
        form.append('photo', image)
    if(name || image)
        updateMe(form)
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
      setName(e.target.value);
    }

   
      return (
          <div>
      <section className="modal-body">
      {error_data.msg.error? <div className="error-msg"><small>{error_data.msg.error}</small></div> : null}
        <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <label htmlFor="photo">Image:</label>
          <input type="file" accept='photo/*' name="photo" id="photo" className="form-control-file" onChange={imageHandler}  />
          {preview ? <img src={preview} id="create-post-image" alt="" style={{width: "100px"}}/>:
          <img src={myPhoto} id="create-post-image" alt="" style={{width: "100px"}}/>}
        </div>
        <button onClick={() => {setImage("");setPreview("")}}>Reset</button>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" label="Your name" type="name" className="form-control" onChange={inputChangeHandler} defaultValue={myName} />
        </div>
        <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Save change</button>
        </div>
          </form>
          </section>
          </div>
      )
  
  }



  
  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })
  
  export default connect(mapStateToProps,{updateMe})(Profile)
