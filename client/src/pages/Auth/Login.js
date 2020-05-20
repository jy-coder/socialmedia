import React, {useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import './Login.css'


const Login = (props) =>{
    const initialState = {email:'',password:''}
    const [state, setState]= useState(initialState)
    const [error,setError] = useState(initialState)
  
    const inputChangeHandler  = e  => {
      console.log(e.target.value)
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      e.preventDefault();
        props.onLogin(e, state)
    
    
    }
  
    return (
    <section className="auth-form">
    <Form>
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

  export default Login;