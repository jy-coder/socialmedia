import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './components/globalError.css'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import MyFeed from './components/MyFeed'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './pages/Auth/Login'
import store from './flux/store'
import { Provider } from 'react-redux';





function App() {


  return (
    <div className="App">
       <Provider store={store}>
    <NavBar/>
    <Switch>
      <Route path="/" exact render={props => (<Posts/>)}/>
      <Route path="/login" exact render={props => (<Login/>)}/>
      <Route path="/feed"exact render={props => (<MyFeed/>)}/>>
    </Switch>
    </Provider>
    </div>
  );  
}

export default App;
