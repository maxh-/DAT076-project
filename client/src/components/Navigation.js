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
      <Navbar className="Navv" fixedTop>
        <Navbar.Brand className="brand">
          <a href="/">Receptsidan</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
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
  const UserButton = () => {
    return (
      <span>
        <Glyphicon glyph="user" />
        {' ' + Auth.user.firstName + ' ' + Auth.user.lastName}
      </span>
    )
  }

  const LogoutButton = () => {
    return (
      <span>
        
      </span>
    );
  }

  return (
    <div>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/profile" className="profile-button active">
          <Glyphicon glyph="user" />{' ' + Auth.user.firstName + ' ' + Auth.user.lastName}
        </a></li>
        <li><a href="/new" className="new-button">
          <Glyphicon glyph="plus" /> Nytt recept
        </a></li>
        <li><a href="/saved" className="heart-button">
          <Glyphicon glyph="heart" className="heart-icon"/> Sparade
        </a></li>
        <li><a href="#" className="logout-button" onClick={() => {Auth.logout() && window.location.reload()}}>
          <Glyphicon glyph="log-out" /> Logga ut
        </a></li>
      </ul>
    {/**<Nav pullRight>
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
    </Nav>**/}
    </div>
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
