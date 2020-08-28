import React, {useState} from 'react';
import './Login.css'
import {login} from '../flux/actions/authActions'
import {connect} from 'react-redux'
import {Button, Box, TextField} from '@material-ui/core';


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
    <div style={{position:'relative' , width: '50%', margin:'auto', top:'40px'}}>
    {error_data.msg? <div className="error-msg"><small>{error_data.msg}</small></div> : null}
    <form onSubmit ={(e) => submitHandler(e)}>
    <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
    <Box height="25%">
      < TextField type="email"   id="email" placeholder="Enter email"onChange={ inputChangeHandler} fullWidth required/>
    </Box>

  <Box height="25%">
    < TextField type="password" id="password"  placeholder="Password" onChange={inputChangeHandler} fullWidth required/>
  </Box>
  <Box display="flex" justifyContent="center" style={{marginTop: '10px'}}>
    <Button type="submit" variant="outlined">
      Submit
    </Button>
  </Box>
  </Box>
</form>
    </div>
      
    );
  }

  const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })

export default connect(mapStateToProps,{login})(Login)