import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Auth from '../util/AuthService';
import UserRecipeStore from '../util/userRecipeStore';
import {
  Row, Col, Modal, Button, FormGroup,
  ControlLabel, FormControl,
  HelpBlock,
  Glyphicon,
  Table
} from 'react-bootstrap';

const PublicProfile = observer(class PublicProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PublicProfile">
        <h2>{Auth.user.firstName} {Auth.user.lastName} offentliga profil </h2>
        <Row>
          <Col className="profilePic">
            <img src="/img/sample-profile-pic.jpg" alt=""/>
          </Col>
              <Col>
                <hr />
                <h2>{Auth.user.firstName} recept:</h2>
                <br />
              </Col>

        </Row>
      </div>
    );
  }
});

export default PublicProfile;
