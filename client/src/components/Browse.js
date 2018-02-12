import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './Footer'

class Browse extends Component {

  // render component
  render() {
    return (
        <div className="Browse">
          <Navigation />
          bläddra
          <Footer />  
        </div>
    );
  }
}

export default Browse;
