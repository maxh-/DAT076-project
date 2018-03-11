import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './css/Footer.css';

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <Row>
          <Col md={2} mdOffset={1} className="footer-brand">
            Receptsidan<br />
            <small>DAT076 projekt</small>
          </Col>
          <Col md={9} className="footer-masthead">
            Adis Mahmutovic<br />
            David Berg Marklund<br />
            Linus Nilsson<br />
            Max Hansson
          </Col>
        </Row>
      </div>
    );
  }
}
export default Footer
