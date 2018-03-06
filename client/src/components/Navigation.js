import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon
} from 'react-bootstrap';
import { observer } from 'mobx-react';
import './css/Navigation.css';

import Auth from '../util/AuthService';

const Navigation = observer(class Navigation extends Component {

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
          <Greeting />
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

const Greeting = observer(() => {
  return Auth.isLoggedIn
    ? <UserNav />
    : <GuestNav />;
});

// if user is logged in
const UserNav = observer((props) => {
  return (
    <Nav pullRight>
      <Navbar.Text>
        Signed in as: <Navbar.Link href="/profile">{Auth.user.firstName + ' ' + Auth.user.lastName}</Navbar.Link>
      </Navbar.Text>
      <NavDropdown title="Mina sidor" id="basic-nav-dropdown">
        <MenuItem href="/new">Nytt recept</MenuItem>
        <MenuItem href="/profile">Min profil</MenuItem>
        <MenuItem href="/saved">Mina sparade recept</MenuItem>
        <MenuItem onClick={() => {Auth.logout() && window.location.reload(); }}>Logga ut</MenuItem>
        <MenuItem divider />
      </NavDropdown>
    </Nav>
  );
});

// if not logged in
function GuestNav(props) {
  return (
    <Nav pullRight>
      <Nav>
        <NavItem href="/login">
          Logga in
        </NavItem>
        <NavItem href="/register">
          Registrera
        </NavItem>
      </Nav>
    </Nav>
  );
}

export default Navigation;
