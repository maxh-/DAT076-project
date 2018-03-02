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
class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/browse' component={Browse}/>
          <Route path='/recipe' component={Recipe} />
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
		      <Route exact path='/' component={Home}/>
		      <Route path='/pages' component={MyPages}/>
		      <Route path='/new' component={NewRecipe}/>
		      <Route path='/profile' component={MyProfile}/>
		      <Route path='/saved' component={MySavedRecipes}/>
          <Route path='/forgotpass' component={ForgotPass}/>
          <Route path='/resetpass/:token' component={ResetPass}/>
    		</Switch>
      </main>
    );
  }
}

export default Main;
