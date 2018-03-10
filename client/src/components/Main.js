import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Browse from './Browse';
import NewRecipe from './NewRecipe';
import MyPages from './MyPages';
import MyProfile from './MyProfile';
import MySavedRecipes from './MySavedRecipes';
import Recipe from './Recipe';
import Register from './Register';
import Login from './Login';
import ForgotPass from './ForgotPass';
import ResetPass from './ResetPass';
import PublicProfile from './PublicProfile';
import NotFoundPage from './NotFoundPage';

import PrivateRoute from '../util/PrivateRoute';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Browse}/>
          <Route path='/recipe/:id' component={Recipe} />
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route path='/publicprofile/:id' component={PublicProfile}/>
	        <PrivateRoute exact path='/pages' component={MyPages}/>
      	  <PrivateRoute exact path='/new' component={NewRecipe}/>
	        <PrivateRoute exact path='/profile' component={MyProfile}/>
	        <PrivateRoute exact path='/saved' component={MySavedRecipes}/>
          <Route exact path='/forgotpass' component={ForgotPass}/>
          <Route exact path='/resetpass/:token' component={ResetPass}/>
          <Route exact path='/404' component={NotFoundPage} />
          <Route component={NotFoundPage} />
    		</Switch>
      </main>
    );
  }
}

export default Main;
