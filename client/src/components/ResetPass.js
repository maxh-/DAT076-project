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

export default class ResetPass extends Component {

  state = {
    password: '',
    password2: ''
  }

onChange = ({ target }) => {
  this.setState({
    [target.name]: target.value
  });
}
onSubmit = (e) => {
  let token = this.props.match.params.token;
  e.preventDefault();
  fetch('/auth/reset/' + token, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      password: this.state.password,
      password2: this.state.password2
    })
  })
  .then(res => res.json())
  .then(function(res) {
    console.log(res);
    const isSuccess = res.success;
    if(isSuccess === true) {
      alert("Ditt lösenord är nu ändrat.");
      window.location = '/login';
    } else {
      alert("Något gick fel, försök att återställa lösenordet igen.")
    }
})




}

  render = () => {
    return (
      <div className="resetpass">
        <Row>
          <Col md={7}>
            <h2>Ange nytt lösenord</h2>
            <hr />
            <form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup
                controlId="password"
                bsSize="large">
                <ControlLabel>Lösenord:</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange.bind(this)} />
              </FormGroup>
              <FormGroup
                controlId="password"
                bsSize="large">
                <ControlLabel>Upprepa lösenord:</ControlLabel>
                <FormControl
                  type="password"
                  name="password2"
                  value={this.state.password2}
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
