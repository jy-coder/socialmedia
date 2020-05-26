import React,{useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import './FollowModal.css'
// import { FiPrinter } from 'react-icons/fi';
import { connect } from 'react-redux';
// import { clearErrors } from '../flux/actions/errorActions';
// import {MdDelete} from 'react-icons/md'
// import {FaEdit} from 'react-icons/fa'

function FollowModal({status, list,len,title,auth}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const displayStatus = (item) => {
  //   if(item._id === auth.user._id)
  //     return null
  //   if(auth.user.followers.find(x => x._id === item._id))
  //     return <button>followed</button>
  //   else
  //     return <button>follow</button>

  // } 


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      {len} {title}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
      <Modal.Title>{title.toUpperCase()}</Modal.Title>
        </Modal.Header>

        <Modal.Body><ul className="user-follow-modal-list">{list ? list.map((follower, i)=> <li> <img src = {'/' + follower.photo} /> <a href ={`/user/${follower._id}`} > {follower.name} </a></li> ) : null}</ul></Modal.Body>
      </Modal>
    </>
  );
}



const mapStateToProps = (state) =>({
  posts_data:state.posts_data,
  error_data: state.error_data,
  auth:state.auth

})


export default connect(mapStateToProps)(FollowModal)
