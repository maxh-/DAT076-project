import React, { Component } from 'react';
import './css/App.css';
import Navigation from './Navigation';
import Footer from './Footer';
import Main from './Main';

class App extends Component {

  // get some data from server
  /*componentDidMount() {
    fetch('/welcome')
      .then(res => res.json())
      .then(strings => this.setState(strings))
      .then(state => console.log(this.state));
  }*/
  
  // render component
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
