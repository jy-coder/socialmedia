import React from 'react';
import './components/globalError.css'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import Feed from './pages/Feed'
import Wall from './pages/Wall'
import Chat from './pages/Chat'
import UserInfo from './components/UserInfo'
import { Route, Switch} from 'react-router-dom';
import Login from './pages/Login'
import Users from './pages/Users'
import { connect } from 'react-redux';
import { loadUser,logout} from './flux/actions/authActions';
import store from './flux/store'
import jwtDecode from 'jwt-decode';
import {CLEAR_ERRORS, NO_USER,SET_ERRORS } from './flux/actions/types'
import { setError } from './flux/actions/errorActions';
import axios from './utils/axios-handler'



const token = localStorage.token;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch({type: NO_USER});
    window.location.href = '/login';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(loadUser())
   
  }
}





axios.interceptors.request.use(req => {
  store.dispatch({ type: CLEAR_ERRORS });
    
  return req;
});
axios.interceptors.response.use(res => res, error => {
  if(error.response){
    if(error.response.status === 401){
      window.location.href = '/login';
      store.dispatch(logout())
    }
    else if (error.response.status === 403){
      store.dispatch({ type: SET_ERRORS, payload: error.response.data.message});
    }
   
  }
  else
    store.dispatch(setError("Network error"))
});


function App({auth}) {
  


  return (
    <div className="App">
    <NavBar/>
      <Switch>
        <Route exact path="/user/:id"  render={props => (<UserInfo {...props}/>)}/>
        <Route exact path="/wall"  render={props => (<Wall/>)}/>
        <Route exact path="/chat"  render={props => (<Chat/>)}/>
        <Route exact path="/users"  render={props => (<Users/>)}/>

        {!auth.isAuthenticated? <Route exact path="/"  render={props => (<Posts/>)}/>: <Route exact path="/"  render={props => (<Feed/>)}/>}
        <Route exact path="/login"  render={props => (<Login/>)}/>

      </Switch>
  
    </div>
  );  
}

const mapStateToProps = (state) =>({
  auth: state.auth

})

export default connect(mapStateToProps,{loadUser,logout})(App);
