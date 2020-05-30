import React, {useState} from 'react';
import './Login.css'
import {login} from '../../flux/actions/authActions'
import {connect} from 'react-redux'
import {Button, Box} from '@material-ui/core';


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
    <form onSubmit ={(e) => submitHandler(e)}>
      <Box flexDirection="column" p={1}>
    <Box>
      <input type="email" placeholder="Enter email" onChange={inputChangeHandler} />
    </Box>

  <Box controlId="password">
    <input type="password" placeholder="Password" onChange={inputChangeHandler} />
  </Box>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Box>
</form>
    </section>
      
    );
  }

  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })

export default connect(mapStateToProps,{login})(Login)