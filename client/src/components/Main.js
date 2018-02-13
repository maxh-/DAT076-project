import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Browse from './Browse';
import NewRecipe from './NewRecipe';
import MyPages from './MyPages';
import MyProfile from './MyProfile';
import MySavedRecipes from './MySavedRecipes';



class Main extends Component {

  // render component
  render() {
  	return (
    	<main>
    		<Switch>
		      <Route exact path='/' component={Home}/>
		      <Route path='/browse' component={Browse}/>
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
