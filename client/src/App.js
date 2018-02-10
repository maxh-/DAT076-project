import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // get some data from server
  componentDidMount() {
    fetch('/welcome')
      .then(res => res.json())
      .then(strings => this.setState(strings))
      .then(state => console.log(this.state));
  }

  // render component
  render() {
    return (
        <div className="App">
          <header className="App-header">
          <h1 className="App-title">
            { this.state && this.state.title }
          </h1>
        </header>
          <p className="App-intro">
            { this.state && this.state.body }
          </p>
        </div>
    );
  }
}

export default App;
