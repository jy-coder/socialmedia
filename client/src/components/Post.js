import React, {useState,useEffect} from 'react'
import {Card, Button,Form, Image, ListGroup, Col, Row} from 'react-bootstrap';
import './Post.css'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import  CustomModal  from './CustomModal'
import {likePost,unlikePost,commentPost, showComment,unshowComment} from '../flux/actions/postActions'
import Comment  from './Comment'
import {FaChevronDown,FaChevronUp} from 'react-icons/fa'

function Post(props) {
  let liked;
  let belongToCurrentUser;
  let commentsCount;
 
  commentsCount = props.comments.length;
   
  
  if(props.auth.user){
    if(props.likes.find(x => x._id === props.auth.user._id))
      liked = true;
    if(props.creator._id === props.auth.user._id)
      belongToCurrentUser = true
  }

    const [comment,setComment]= useState('')



    
    const inputChangeHandler  = e  => {
      setComment(e.target.value);
    }
    
    return (
      
        <div className="one-post">
        <Card>
        <Card.Header className="card-header">
        {belongToCurrentUser?
        <div className="user-edit">
        <CustomModal status={"delete"} _id={props._id}/>
        <CustomModal status={"update"} _id={props._id}/>
        </div>:null}
        
        <div className="user-header">
        <div>
          <Image className="user-image" src={'/' +props.creator.photo} rounded />
        </div>
        <div>
         {!belongToCurrentUser  ? <a href={`/user/${props.creator._id}`}>{props.creator.name}</a> :
         <a>{props.creator.name}</a>}
          <br/>
          <small className="text-muted"><Moment format="DD-MM-YYYY HH:mm">{props.createdAt}</Moment></small>
        </div>
        </div>
        
        </Card.Header>
        <Card.Body className="card-body">
        <div className="post-photo-content">
        {props.photo? <div className="post-photo"><img src={'/' +props.photo}  width="200" height="200"></img></div> : null}
          <div className="card-content">
            {props.content}
          </div>
        </div>
          
          <div className="like-dislike">
             {liked?<div className="like" onClick={()=>props.unlikePost(props._id)}>Liked</div>: <div className="like" onClick={()=>props.likePost(props._id)}>Like</div>}
          <div className="comment">Comment ({commentsCount}) 
          {!props.show ? <FaChevronDown onClick ={() =>props.showComment(props._id)}/> :
          <FaChevronUp onClick ={() =>props.unshowComment(props._id)}/>}
          </div>

          </div>
        </Card.Body>
      
        <ListGroup variant="flush" className={!props.show ?"list-group-comment--hide":"list-group-comment" }>
       
        {props.comments? props.comments.map((comment, i)=>(<Comment key={i} postId={props._id}  comment={comment}/>)) : null}
          
        <Form>
          <Form.Control type="text" placeholder="Enter comment" onChange={inputChangeHandler} />
          <Button variant="primary" onClick={()=>props.commentPost(props._id,comment)}>Comment</Button>
        </Form>
        
        </ListGroup>
       
      
        
        
     
   
      </Card>
      </div>
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })
  
  export default connect(mapStateToProps,{likePost,unlikePost,commentPost, showComment,unshowComment})(Post)



