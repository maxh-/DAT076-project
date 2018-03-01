import { extendObservable } from 'mobx';

import Storage from './authStore';

class Auth {
  constructor() {
    extendObservable(this, {
      get isLoggedIn() {
        return !!Storage.user;
      },
      get token() {
        return Storage.token;
      },
      get user() {
        return Storage.user;
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
            Storage.user = body.user;
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

window.auth = new Auth();
