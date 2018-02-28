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
            <Navbar.Text>
              Signed in as: <Navbar.Link href="/pages">Mark Otto</Navbar.Link>
            </Navbar.Text>
            <NavDropdown eventKey={2} title="Mina sidor" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} href="/new">Nytt recept</MenuItem>
              <MenuItem eventKey={2.2} href="/profile">Min profil</MenuItem>
              <MenuItem eventKey={2.3} href="/saved">Mina sparade recept</MenuItem>
              <MenuItem divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
