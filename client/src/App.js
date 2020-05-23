import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './components/globalError.css'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import Feed from './components/Feed'
import Wall from './components/Wall'
import UserInfo from './components/UserInfo'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './pages/Auth/Login'
import Profile from './pages/Auth/Profile'
import Register from './pages/Auth/Register'
import { connect } from 'react-redux';
import { loadUser } from './flux/actions/authActions';
import store from './flux/store'
import axios from 'axios';





function App({auth}) {
  
  useEffect(() => {
  if(auth.token){
    axios.defaults.headers.common['Authorization'] = auth.token;
    store.dispatch(loadUser());
  }
  }, []);


  return (
    <div className="App">
    <NavBar/>
    <Switch>
      <Route path="/" exact render={props => (<Feed/>)}/>
      <Route path="/user/:id" exact render={props => (<UserInfo {...props}/>)}/>
      <Route path="/profile" exact render={props => (<Profile/>)}/>
      <Route path="/wall" exact render={props => (<Wall/>)}/>
      {!auth.isAuthenticated?
      <>
      <Route path="/" exact render={props => (<Posts/>)}/>
      <Route path="/login" exact render={props => (<Login/>)}/>
      <Route path="/register" exact render={props => (<Register/>)}/>
      </>:
      null}
    </Switch>
  
    </div>
  );  
}

const mapStateToProps = (state) =>({
  auth: state.auth

})

export default connect(mapStateToProps)(App);
