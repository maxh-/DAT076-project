import { extendObservable } from 'mobx';
import jwt from 'jsonwebtoken';

import Storage from './commonStore';

class Auth {
  constructor() {
    extendObservable(this, {
      get isLoggedIn() {
        return !!Storage.getUser();
      },
      get token() {
        return Storage.token;
      },
      get user() {
        return JSON.parse(Storage.user);
      }
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      fetch('/auth/login', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then((body) => {
          if(body.success && body.user && body.token) {
            Storage.token = body.token;
            Storage.user = JSON.stringify(body.user);
            resolve();
          } else {
            reject();
          }
        });
    });
  }


  logout() {
    Storage.user = null;
    Storage.token = null;
    return true;
  }
  
}

export default new Auth();

//window.auth = new Auth();
