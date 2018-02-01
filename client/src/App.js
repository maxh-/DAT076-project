import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  // get some data from server
  componentDidMount() {
    return fetch('/welcome')
      .then(res => res.json())
      .then(strings => this.setState({ strings }));
  }

  // render component
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.strings}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
