import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class NotFoundPage extends Component {
  render() {
    const pageStyle = {
      marginTop: '40px',
      marginBottom: '40px'
    };
    
    const headingStyle = {
      fontSize: '5em'
    };

    const textStyle = {
      fontSize: '1.6em'
    };

    return (
      <Row style={pageStyle}>
        <Col md={6} mdOffset={3}>
          <h1 style={headingStyle}>404</h1>
          <hr />
          <p style={textStyle}>Kunde inte hitta ingrediensen i skafferiet HEHE</p>
        </Col>
      </Row>
    );
  }
}

export default NotFoundPage;
