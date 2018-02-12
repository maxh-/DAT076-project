import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './css/Navigation.css'

class Navigation extends Component {


  // render component
  render() {
    return (
        <Navbar className="nav" inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Hem</a>
            </Navbar.Brand>
             <Nav>
            <NavItem eventKey={1} href="#">
              Bläddra
            </NavItem>

          </Nav>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            <Navbar.Text>
              Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
            </Navbar.Text>
              <NavDropdown eventKey={2} title="Mina sidor" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Nytt recept</MenuItem>
              <MenuItem eventKey={2.2}>Min profil</MenuItem>
              <MenuItem eventKey={2.3}>Mina sparade recept</MenuItem>
              <MenuItem divider />
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Navigation;
