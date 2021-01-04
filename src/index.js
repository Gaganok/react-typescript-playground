//React
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//Pages
import LoginPage from './Page/LoginPage/Index';
import MainPage from './Page/MainPage/Index.jsx';
import UserListingPage from './Page/UserListingPage/Index';
import PhotoPage from './Page/PhotoPage/Index';
import RainPage from './Page/RainPage/Index';
import EffectPage from './Page/EffectPage/Index'
import ThreePage from './Page/ThreePage/Index'
//Style
import './index.css';
import ResponsiveDrawer from './Components/ResponsiveDrawer';

ReactDOM.render(
  <Router>
    <div>
      <ResponsiveDrawer>
        <Switch>
          <Route path = '/home' component={MainPage}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/listing/user' component={UserListingPage}/>
          <Route path='/photos' component={PhotoPage}/>
          <Route path='/rain' component={RainPage}/>
          <Route path='/effect' component={EffectPage}/>
          <Route path='/three' component={ThreePage}/>
        </Switch>
      </ResponsiveDrawer>
    </div>
  </Router>,
  document.getElementById('root')
);