import React, {useState} from 'react';
import './Login.css'
import {register} from '../flux/actions/authActions'
import {connect} from 'react-redux'
import {Button, Box} from '@material-ui/core';


export const Register = ({register,error_data}) =>{
    const [state, setState]= useState({email:'',name:'',password:'',confirmPassword:''})

  
    const inputChangeHandler  = e  => {
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      e.preventDefault();
      console.log(state)
      register(state)
    }
  
    return (
    <section className="auth-form">
    {error_data.msg? <div className="error-msg"><small>{error_data.msg.message}</small></div> : null}
    <form onSubmit ={(e) => submitHandler(e)}>
    <Box flexDirection="column" p={1}>
    <Box controlId="email">
      <input type="email" placeholder="Enter email" onChange={inputChangeHandler} />
    </Box>

    <Box controlId="name">
      <input type="text" placeholder="Enter name" onChange={inputChangeHandler} />
    </Box>

  <Box controlId="password">
    <input type="password" placeholder="Password" onChange={inputChangeHandler} />
  </Box>


  <Box controlId="confirmPassword">
      <input type="password" placeholder="Confirm password" onChange={inputChangeHandler} />
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
    error_data: state.error_data
  
  })

export default connect(mapStateToProps,{register})(Register)