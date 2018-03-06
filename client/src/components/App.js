import React, { Component } from 'react';
import './css/App.css';
import Navigation from './Navigation';
import Footer from './Footer';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <Main />
        </div>
        <Footer />
      </div>
    );
  }
}
/*
Färger som ska användas ifrån flat ui-palette:
  -Bakgrund: grå (CLOUDS)
  -Accent: grön(EMERALD) och mörkgrön vid hoover (NEPHRITIS)

*/

export default App;
