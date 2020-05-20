import React from 'react'
import {Card, Button,Form, Image, ListGroup, Col, Row} from 'react-bootstrap';
import './Post.css'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import {deleteItem} from '../flux/actions/postActions'
import  CustomModal  from './CustomModal'
import {likePost} from '../flux/actions/postActions'

function Post(props) {
  let liked;
  if(props.likes.find(x => x._id === "5ebbbd886954234550fe23f3"))
    liked = true;
    
    return (
      
        <div className="one-post">
          {console.log(liked)}
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
          {props.creator.name}
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
             {liked?<div>Liked</div>: <div onClick={()=>props.likePost(props._id)}>Like</div>}
            <div>Comment(x)</div>

          </div>
        </Card.Body>
        <Card.Footer>
        <ListGroup variant="flush" className="list-group-comment">
        <ListGroup.Item className="border-0">

        <div className="comment-header">
          <div><Image className="comment-user-image pr-1" src="logo512.png" rounded/></div>
          <div>
            username&nbsp;&nbsp;date
          </div>
          </div>
          <div className="comment-by-user ">
            comment
          </div>
          
        </ListGroup.Item>
        </ListGroup>
        <Form>
          <Form.Control type="text" placeholder="Enter comment" />
          <Button variant="primary" type="submit">Comment</Button>
        </Form>
        
     
    </Card.Footer>
      </Card>
      </div>
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data
  
  })
  
  export default connect(mapStateToProps,{likePost})(Post)



