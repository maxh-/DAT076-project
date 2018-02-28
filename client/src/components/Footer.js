import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import './css/Footer.css';

class Footer extends Component {
  render() {
    return(
      <Navbar className="Footer" inverse collapseOnSelect>
          <h3>Footer</h3>
      </Navbar>
    );
  }
}
export default Footer
