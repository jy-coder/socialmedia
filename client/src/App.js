import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './components/globalError.css'
import NavBar from './components/NavBar'
import MyPosts from './components/MyPosts'
import UserInfo from './components/UserInfo'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './pages/Auth/Login'
import store from './flux/store'
import { Provider } from 'react-redux';
import Register from './pages/Auth/Register'

import { loadUser } from './flux/actions/authActions';





function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <div className="App">
       <Provider store={store}>
    <NavBar/>
    <Switch>
      <Route path="/" exact render={props => (<MyPosts/>)}/>
      <Route path="/login" exact render={props => (<Login/>)}/>
      <Route path="/register" exact render={props => (<Register/>)}/>
      <Route path="/user/:id" exact render={props => (<UserInfo {...props}/>)}/>>
    </Switch>
    </Provider>
    </div>
  );  
}

export default App;
