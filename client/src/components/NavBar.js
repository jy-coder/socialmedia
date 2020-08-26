import React, {useEffect} from 'react'
import { makeStyles, AppBar,Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import {Message} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {logout} from './../flux/actions/authActions'

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  


function NavBar({auth,logout}) {
  // console.log(auth)

let routes;
if(!auth.isAuthenticated){
  routes=(
    <>
    <Button color="inherit" component={Link} to="/register">Register</Button>
    <Button color="inherit" component={Link} to="/login">Login</Button>
    </>
  )
}
else if(auth.isAuthenticated){
  routes=(
    <>
         <IconButton component={Link} to="/chat"><Message/></IconButton>
        <Button color="inherit" component={Link} to="/wall" >My Wall</Button>
        <Button color="inherit" onClick={() => logout()}  >Logout</Button>
    </>
  )
}

    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             
              </IconButton>
              <Typography variant="h6" className={classes.title}>
              <Button color="inherit" component={Link} to="/" >Home </Button>
              </Typography>
              {routes}
            </Toolbar>
          </AppBar>
        </div>
      );
    }


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })

export default connect(mapStateToProps,{logout})(NavBar);
