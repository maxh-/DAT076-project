import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import './css/ResetPass.css';

export default class ForgotPass extends Component {
constructor(props) {
  super(props);
  this.state = {
    email: ''
  };
}

  async onChange(e) {
    await this.setState({ email: e.target.value });
    console.log(this.state);
  }

onSubmit(e) {
  e.preventDefault();

  fetch('/auth/forgot', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
    email: this.state.email
    })

  })
  .then(res => res.json())
  .then(res => console.log(res));

  alert("Ett mail har skickats till " + this.state.email + " med mer information. ")
}

  render() {
    return (
      <div className="forgotpass">
        <Row>
          <Col md={7}>
            <h2>Återställ Lösenord</h2>
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
              <Button type="submit" className="btn btn-primary btn-lg pull-right">Återställ</Button>
            </form>
          </Col>
        </Row>
      </div>
      );
    }
  }
