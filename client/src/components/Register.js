import React, { Component } from 'react';
import Form from './Form'
import './css/Form.css';

class Register extends Component {

state = {
  fields:{}
};

onSubmit = fields => {
  console.log(fields);
}
  // render component
  render() {
    return (
      <div className="Register">
      <h1>Registrera dig!</h1>
      <Form onSubmit={fields => this.onSubmit(fields)}/>
      </div>

    );
  }
}
export default Register
