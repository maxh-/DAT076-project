import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './css/Footer.css';

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <Row>
          <Col sm={2} className="footer-brand">
            Receptsidan<br />
            <small>DAT076 projekt</small>
          </Col>
          <Col sm={10} className="footer-masthead">
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
