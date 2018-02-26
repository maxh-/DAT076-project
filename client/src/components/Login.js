import React, { Component } from 'react';

export default class Login extends Component {

  state = {
    fields:{}
  }
  onSubmit = fields => {
    console.log(fields);
  }
  // render component
  render() {
    return (
        <div className="Login">
        <h1>Logga in</h1>
        </div>

    );
  }
}

