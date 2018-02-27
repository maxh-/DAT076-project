import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import './css/Login.css';

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    showError: false
  }

  // handle field changes
  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  // post credentials to backend
  onSubmit = (e) => {
    e.preventDefault();
    fetch('/auth/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => this.handleLogin(res.json()));
  }

  // verify user is logged in and either redirect or show error
  handleLogin = (res)  => {
    
  }
  
  render = () => {
    return (
      <div className="login">
        <Row>
          <Col md={7}>
            <h2>Logga in</h2>
            <hr />
            <form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup
                controlId="email"
                bsSize="large">
                <ControlLabel>E-post:</ControlLabel>
                <FormControl
                  type="text"
                  autoComplete="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange.bind(this)} />
              </FormGroup>
              <FormGroup
                controlId="password"
                bsSize="large">
                <ControlLabel>Lösenord:</ControlLabel>
                <FormControl
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange.bind(this)} />
              </FormGroup>
              <Button type="submit" className="btn btn-primary btn-lg pull-right">Logga in </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
  
}

