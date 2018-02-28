import { extendObservable } from 'mobx';
import jwt from 'jsonwebtoken';

import Storage from './commonStore';

class Auth {
  constructor() {
    extendObservable(this, {
      get isLoggedIn() {
        return !!Storage.getUser();
      },
      get getToken() {
        return Storage.getToken();
      },
      get getUser() {
        return Storage.getUser();
      }
    });
  }

  async login(username, password) {
    const result = await fetch('/auth/login', {
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
          await Storage.setUser(body.user);
          return true;
        } else {
          return false;
        }
      });
    
    return result;
  }

  logout() {
    Storage.removeToken();
  }
  
}

export default new Auth();
