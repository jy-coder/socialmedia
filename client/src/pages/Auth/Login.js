import React, {useState} from 'react';
import './Login.css'
import {login} from '../../flux/actions/authActions'
import {connect} from 'react-redux'
import {Button, Box, Input} from '@material-ui/core';


const Login = ({login,error_data}) =>{
    const [state, setState]= useState({email:'',password:''})

  
    const inputChangeHandler  = e  => {
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      console.log(state)
      e.preventDefault();
      login(state)

    
    }
  
    return (
    <section className="auth-form">
    {error_data.msg? <div className="error-msg"><small>{error_data.msg.message}</small></div> : null}
    <form onSubmit ={(e) => submitHandler(e)}>
    <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
    <Box height="25%">
      <Input type="email" style = {{fontSize: 20}}  id="email" placeholder="Enter email" h={300} onChange={inputChangeHandler} />
    </Box>

  <Box height="25%">
    <Input type="password" id="password" style = {{fontSize: 20}} placeholder="Password" onChange={inputChangeHandler} />
  </Box>
  <Button type="submit">
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