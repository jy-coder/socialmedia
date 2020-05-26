import React,{useState, useEffect} from 'react'
import AddPost from './AddPost'
import UpdatePost from './UpdatePost'
import DeletePost from './DeletePost'
import { Button, Modal } from 'react-bootstrap'
import { FiPrinter } from 'react-icons/fi';
import { connect } from 'react-redux';
import { clearErrors } from '../flux/actions/errorActions';
import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'

export function CustomModal({clearErrors, error_data, status,_id}) {
        const [show, setShow] = useState(false);
        const handleClose = () => {
          setShow(false)
          if(error_data)
            clearErrors()
          
        }
        const handleShow = () => setShow(!show);

        const Obj = (status) =>{
          switch (status) {
            case 'add':
              return  {btn: <Button variant="primary"  onClick={handleShow}>Add Post</Button>, title:<Modal.Title>Add Post</Modal.Title>, component: <AddPost handleClose={handleClose} />}
            case 'update':
              return {btn: <FaEdit style={{cursor: 'pointer'}} onClick={handleShow}/>,title: <Modal.Title>Update Post </Modal.Title>, component: <UpdatePost _id={_id} handleClose={handleClose}/>}
            case 'delete':
              return {btn: <MdDelete style={{cursor: 'pointer'}} onClick={handleShow}/>, component: <DeletePost _id={_id} handleClose={handleClose}/>}
            default:
              return null;
        }
      }


        const objFinal ={...Obj(status)}
        

      
        return (
          <>
            
              {objFinal.btn}
            
            <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose}>
            <Modal.Header closeButton>{objFinal.title}</Modal.Header>
            <Modal.Body>{objFinal.component}</Modal.Body>
            </Modal>
          </>
    )
}






export default CustomModal;