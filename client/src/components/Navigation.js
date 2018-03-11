import React, { Component } from 'react';
import {
  Navbar,
  Glyphicon
} from 'react-bootstrap';
import { observer } from 'mobx-react';
import './css/Navigation.css';

import Auth from '../util/AuthService';

const Navigation = observer(class Navigation extends Component {
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
  return (
    <div>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/profile" className="profile-button active">
          <Glyphicon glyph="user" />{' ' + Auth.user.firstName + ' ' + Auth.user.lastName}
        </a></li>
        <li><a href="/new">
          <Glyphicon glyph="plus" className="plus-icon"/> Nytt recept
        </a></li>
        <li><a href="/saved" className="heart-button">
          <Glyphicon glyph="heart" className="heart-icon"/> Sparade
        </a></li>
        <li><a href="#" className="logout-button" onClick={() => {Auth.logout() && window.location.reload()}}>
          <Glyphicon glyph="log-out" /> Logga ut
        </a></li>
      </ul>
    </div>
  );
});

// if not logged in
function GuestNav(props) {
  return (
    <ul className="nav navbar-nav navbar-right">
      <li><a href="/profile">
        <Glyphicon glyph="log-in" /> Logga in
      </a></li>
      <li><a href="/register" className="register-button">
        Registrera
      </a></li>
    </ul>
  );
}

export default Navigation;
