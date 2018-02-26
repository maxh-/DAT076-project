import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './css/Navigation.css';

class Navigation extends Component {
  
  // render component
  render() {
    return (
      <Navbar className="Navv" inverse fixedTop>
        <Navbar.Brand>
          <a href="/">Hem</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav>
          <NavItem href="/browse">
            Bläddra
          </NavItem>
        </Nav>
          <Nav pullRight>
            <NavItem href="/login">
              Logga in
            </NavItem>
            <NavItem href="/register">
              Registrera dig
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
