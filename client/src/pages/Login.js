import React, {useState} from 'react';
import './Login.css'
import {login} from '../flux/actions/authActions'
import {connect} from 'react-redux'
import {Button, Box, TextField, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position:'relative' , 
    width: '50%', 
    margin:'auto', 
    top:'100px'
  },
  flex:{
    marginTop: '10px'
  }
});

const Login = ({login,error_data}) =>{
    const [state, setState]= useState({email:'',password:''})
    const classes = useStyles();
  
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
    <div className={classes.root}>
    {error_data.msg? <div className="error-msg"><small>{error_data.msg}</small></div> : null}
    <form onSubmit ={(e) => submitHandler(e)}>
    <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
    <Box height="25%">
      < TextField type="email"   id="email" placeholder="Enter email"onChange={ inputChangeHandler} fullWidth required/>
    </Box>

  <Box height="25%">
    < TextField type="password" id="password"  placeholder="Password" onChange={inputChangeHandler} fullWidth required/>
  </Box>
  <Box display="flex" justifyContent="center" className={classes.flex}>
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