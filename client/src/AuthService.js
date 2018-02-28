import { extendObservable } from 'mobx';
import jwt from 'jsonwebtoken';

import Storage from './commonStore';

class Auth {
  constructor() {
    extendObservable(this, {
      user: null,
      get isLoggedIn() {
        return !!Storage.getUser();
      },
      get getToken() {
        return Storage.getToken();
      }
    });
  }

  async login(username, password) {
    await fetch('/auth/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(async body => {
        if(body.success === true) {
          await Storage.setToken(body.token);
          await Storage.setUser(this.getUser(body.token));
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    Storage.removeToken();
  }
  
}

export default new Auth();
