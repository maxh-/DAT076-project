import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Browse from './Browse';
import NewRecipe from './NewRecipe';
import MyPages from './MyPages';
import MyProfile from './MyProfile';
import MySavedRecipes from './MySavedRecipes';
import Register from './Register';
import Login from './Login';

class Main extends Component {

  // render component
  render() {
  	return (
    	<main>
    		<Switch>
          <Route path='/browse' component={Browse}/>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
		      <Route exact path='/' component={Home}/>
		      <Route path='/pages' component={MyPages}/>
		      <Route path='/new' component={NewRecipe}/>
		      <Route path='/profile' component={MyProfile}/>
		      <Route path='/saved' component={MySavedRecipes}/>
    		</Switch>
      </main>
    );
  }
}

export default Main;
