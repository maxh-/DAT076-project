import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap';

import './css/Login.css';
import Auth from '../util/AuthService';

const Login = observer(class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false
    };
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    return Auth.login(this.state.email, this.state.password)
      .then(() => {
        console.log('login success');
      })
      .catch(() => {
        this.setState({
          error: true
        });
        console.log('login failed');
      });
  }

  renderError() {
    if (this.state.error) {
      return (
          <Row>
          <Col md={12}>
          <Panel bsStyle="danger">
          <Panel.Heading>
          <Panel.Title componentClass="h3">Fel:</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
          Fel användarnamn eller lösenord.
        </Panel.Body>
          </Panel>  
          </Col>
          </Row>
      );
    } else {
      return null;
    }
  }

  render() {
    if (Auth.isLoggedIn) {
      this.props.history.push('/');
    }

    return (
      <div className="login">
        <Row>
          <Col sm={8} smOffset={2} md={6} mdOffset={3}>
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
              <a href="/forgotpass" >Glömt lösenord</a>
        
      </form>
        {this.renderError()}
          </Col>
        </Row>
      </div>
    );
  }
});

export default Login;
