import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './Footer'

class MySavedRecipes extends Component {

  // render component
  render() {
    return (
        <div className="Browse">
          <Navigation />
          mina sparade recept
          <Footer />  
        </div>
    );
  }
}

export default MySavedRecipes;
