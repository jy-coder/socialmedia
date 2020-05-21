import React, {useState} from 'react'
import {Card, Button,Form, Image, ListGroup, Col, Row} from 'react-bootstrap';
import './MyPost.css'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import  CustomModal  from './CustomModal'
import {likePost,unlikePost,commentPost, showComment,unshowComment,getuserInfo} from '../flux/actions/postActions'
import Comment  from './Comment'
import {FaChevronDown,FaChevronUp} from 'react-icons/fa'

function MyPost(props) {
  // console.log(props)
  let liked;
  let commentsCount = props.comments.length;
  if(props.likes.find(x => x._id === "5ebbbd886954234550fe23f3"))
    liked = true;

    const [comment,setComment]= useState('')


    
    const inputChangeHandler  = e  => {
      setComment(e.target.value);
    }
    
    return (
      
        <div className="one-post">
        <Card>
        <Card.Header className="card-header">
        <div className="user-edit">
        <CustomModal status={"delete"} _id={props._id}/>
        <CustomModal status={"update"} _id={props._id}/>
        </div>
        
        <div className="user-header">
        <div>
          <Image className="user-image" src="logo512.png"rounded />
        </div>
        <div>
          <a href={`/user/${props.creator._id}`}>{props.creator.name}</a>
          <br/>
          <small className="text-muted"><Moment format="DD-MM-YYYY HH:mm">{props.createdAt}</Moment></small>
        </div>
        </div>
        
        </Card.Header>
        <Card.Body className="card-body">
          <div className="card-content">
            {props.content}
          </div>
          <div className="like-dislike">
             {liked?<div onClick={()=>props.unlikePost(props._id)}>Liked</div>: <div onClick={()=>props.likePost(props._id)}>Like</div>}
          <div>Comment ({commentsCount}) 
          {!props.show ? <FaChevronDown onClick ={() =>props.showComment(props._id)}/> :
          <FaChevronUp onClick ={() =>props.unshowComment(props._id)}/>}
          </div>

          </div>
        </Card.Body>
        <Card.Footer>
        <ListGroup variant="flush" className={!props.show ?"list-group-comment--hide":"list-group-comment" }>
       
        {props.comments? props.comments.map((comment, i)=>(<Comment key={i} postId={props._id}  comment={comment}/>)) : null}
          
        
        </ListGroup>
        <div className="input-comment">
        <Form>
          <Form.Control type="text" placeholder="Enter comment" onChange={inputChangeHandler} />
          <Button variant="primary" onClick={()=>props.commentPost(props._id,comment)}>Comment</Button>
        </Form>
        </div>
        
     
    </Card.Footer>
      </Card>
      </div>
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data
  
  })
  
  export default connect(mapStateToProps,{likePost,unlikePost,commentPost, showComment,unshowComment,getuserInfo})(MyPost)



