import React, { Component } from 'react';
import FormLogin from './FormLogin';
import './css/Form.css';

class Login extends Component {

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
      <FormLogin onSubmit={fields => this.onSubmit(fields)}/>
      </div>

    );
  }
}
export default Login
