import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Row,
  Col
} from 'react-bootstrap';
import * as EmailValidator from 'email-validator';
import './css/Register.css';

export default class Register extends Component {
  onSubmit(fields) {
    console.log(fields);
  }
  
  render() {
    return (
      <div className="register">
        <h2>Registrering</h2>
        <hr />
        <RegisterForm />
      </div>
    );
  }
}

class RegisterForm extends Component {
    constructor(props, context) {
    super(props, context);

    //this.handleEm = this.handleChange.bind(this);

    this.state = {
      email: ''
    };
  }

  getValidEmailState() {
    if (this.state.email.length > 0) {
      const isValid = EmailValidator.validate(this.state.email);
      if (isValid) return 'success';
      else return 'error';
    } else {
      return null;
    }
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <Row>
        <Col md={7}>
          <form>
            <FormGroup
              controlId="email"
              validationState={this.getValidEmailState()}
              bsSize="large">
              <ControlLabel>E-post:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="exempel@email.com"
                onChange={this.onEmailChange.bind(this)} />
              <FormControl.Feedback />
              <HelpBlock>help text</HelpBlock>
            </FormGroup>
          </form>
        </Col>
      </Row>
    );
  }
}

