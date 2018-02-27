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
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: ''
    };
  }

  getEmailState() {
    if (this.state.email.length == 0) return null;

    const isValid = EmailValidator.validate(this.state.email);
    if (isValid) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getFirstNameState() {
    if (this.state.firstName.length == 0) return null;

    if (/^[a-zA-Z]+$/.test(this.state.firstName)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getLastNameState() {
    if (this.state.lastName.length == 0) return null;

    if (/^[a-zA-Z]+$/.test(this.state.lastName)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getPasswordState () {
    if (this.state.password.length == 0) return null;

    if (/^[^\s]+$/.test(this.state.password) && this.state.password.length > 2) {
      return 'success';
    } else {
      return 'error';
    }
  }

  getPassword2State () {
    if (this.state.password2.length == 0) return null;

    if(this.state.password != this.state.password2) {
      return 'error';
    } else {
      return 'success';
    }

  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    console.log(this.state);
  }

  onFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
    console.log(this.state);
  }

  onLastNameChange(e) {
    this.setState({ lastName: e.target.value });
    console.log(this.state);
  }

async onPasswordChange(e) {
  await  this.setState({ password: e.target.value });
    console.log(this.state);
  }

async onPassword2Change(e) {
  await  this.setState({ password2: e.target.value });
    console.log(this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    fetch('/auth/register', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })

    })
    .then(res => res.json())
    .then(res => console.log(res));
  }

//TODO: Fixa generell onChange-funktion som funkar med bootstrap.
  render() {
    return (
      <Row>
        <Col md={7}>
          <form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup
              controlId="email"
              validationState={this.getEmailState()}
              bsSize="large">
              <ControlLabel>E-post:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="exempel@email.com"
                onChange={this.onEmailChange.bind(this)} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="firstName"
              validationState={this.getFirstNameState()}
              bsSize="large">
              <ControlLabel>Förnamn:</ControlLabel>
              <FormControl
                type="text"
                name="firstName"
                value={this.state.value}
                placeholder="Förnamn"
                onChange={this.onFirstNameChange.bind(this)} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="lastName"
              validationState={this.getLastNameState()}
              bsSize="large">
              <ControlLabel>Efternamn:</ControlLabel>
              <FormControl
                type="text"
                name="lastName"
                value={this.state.value}
                placeholder="Efternamn"
                onChange={this.onLastNameChange.bind(this)} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={this.getPasswordState()}
              bsSize="large">
              <ControlLabel>Lösenord:</ControlLabel>
              <FormControl
                type="password"
                name="password"
                value={this.state.value}
                placeholder="Ange lösenord"
                onChange={this.onPasswordChange.bind(this)} />
                <HelpBlock>Lösenordet måste vara minst 3 tecken långt</HelpBlock>
              </FormGroup>
                <FormGroup
                  controlId="password2"
                  validationState={this.getPassword2State()}
                  bsSize="large">
                  <ControlLabel>Återupprepa Lösenord:</ControlLabel>
                  <FormControl
                    type="password"
                    name="password2"
                    value={this.state.value}
                    placeholder="Återupprepa lösenord"
                    onChange={this.onPassword2Change.bind(this)} />
              <FormControl.Feedback />
            </FormGroup>
            <button type="submit" class="btn btn-primary">Registrera</button>
          </form>
        </Col>
      </Row>
    );
  }
}
