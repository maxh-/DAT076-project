import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './Footer'

class MyPages extends Component {

  // render component
  render() {
    return (
        <div className="Browse">
          <Navigation />
          mina sidor
          <Footer />  
        </div>
    );
  }
}

export default MyPages;
