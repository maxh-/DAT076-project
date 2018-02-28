import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Button
} from 'react-bootstrap';

import './css/Login.css';
import Auth from '../util/AuthService';

const Login = observer(class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: ''
    };
  }

  // handle field changes
  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  // login
  onSubmit = (e) => {
    e.preventDefault();
    return Auth.login(this.state.email, this.state.password)
      .then(() => {
        console.log('login success');
      })
      .catch(() => {
        console.log('login failed');
      });
  }
  
  render = () => {
    if (Auth.isLoggedIn) {
      this.props.history.push('/');
    }
    
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
                  onChange={this.onChange.bind(this)}
                  />
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
                  onChange={this.onChange.bind(this)}
                  />
              </FormGroup>
              <Button type="submit" className="btn btn-primary btn-lg pull-right">
                Logga in
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
});

export default Login;
