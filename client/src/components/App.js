import React, { Component } from 'react';
import './css/App.css';
import Footer from './Footer';
import Navigation from './Navigation';
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

export default App;
