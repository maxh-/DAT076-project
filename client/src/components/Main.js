import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Browse from './Browse';
import Home from './Home';
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


import PrivateRoute from '../util/PrivateRoute';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Browse}/>
          <Route path='/recipe/:id' component={Recipe} />
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route path='/publicprofile/:id' component={PublicProfile}/>
	  <Route exact path='/' component={Browse}/>
	  <PrivateRoute path='/pages' component={MyPages}/>
	  <PrivateRoute path='/new' component={NewRecipe}/>
	  <PrivateRoute path='/profile' component={MyProfile}/>
	  <PrivateRoute path='/saved' component={MySavedRecipes}/>
          <Route path='/forgotpass' component={ForgotPass}/>
          <Route path='/resetpass/:token' component={ResetPass}/>


    		</Switch>
      </main>
    );
  }
}

export default Main;
