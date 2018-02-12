import React, { Component } from 'react';
import { Nav, Navbar,NavItem, } from 'react-bootstrap';

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
