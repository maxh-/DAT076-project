import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './Footer'

class NewRecipe extends Component {

  // render component
  render() {
    return (
        <div className="Browse">
          <Navigation />
          Nytt recept
          <Footer />  
        </div>
    );
  }
}

export default NewRecipe;
