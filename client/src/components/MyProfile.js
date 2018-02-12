import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './Footer'

class MyProfile extends Component {

  // render component
  render() {
    return (
        <div className="Browse">
          <Navigation />
          Min profil
          <Footer />  
        </div>
    );
  }
}

export default MyProfile;
