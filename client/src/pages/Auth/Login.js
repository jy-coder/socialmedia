import React, {useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import './Login.css'
import {login} from '../../flux/actions/authActions'
import {connect} from 'react-redux'


const Login = ({login,error_data}) =>{
    const [state, setState]= useState({email:'',password:''})

  
    const inputChangeHandler  = e  => {
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      e.preventDefault();
      login(state)

    
    }
  
    return (
    <section className="auth-form">
    {error_data.msg? <div className="error-msg"><small>{error_data.msg.message}</small></div> : null}
    <Form onSubmit ={(e) => submitHandler(e)}>
    <Form.Group controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={inputChangeHandler} />
      <Form.Text className="text-muted">
      </Form.Text>
    </Form.Group>

  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={inputChangeHandler} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </section>
      
    );
  }

  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })

export default connect(mapStateToProps,{login})(Login)