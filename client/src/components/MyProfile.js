import React, { Component } from 'react';
import './css/MyProfile.css';
import { Row, Col, Container } from 'react-bootstrap';

class MyProfile extends Component {

  // render component
  render() {
    return (
      <div className="MyProfile">
        <Row>
          <Col md={2} className="profilePic">
            <img src="/img/sample-profile-pic.jpg" />
          </Col>
          <Col md={10} className="aboutUser">
            <Row>
              <Col>
                <h2>Namn Namnsson <small><a href="#">Redigera profil</a></small></h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>E-post:</strong> bla@bla.com
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyProfile;
