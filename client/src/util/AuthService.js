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

  async update(firstName, lastName) {
    if (!Storage.token) return false;
    
    // don't update if values haven't changed
    if (firstName === Storage.user.firstName &&
        lastName === Storage.user.lastName) return false;

    // update user in db
    const result = await fetch('/user/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `jwt ${Storage.token}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName
      })
    }).then(async (res) => {
      try {
        const body = await res.json();
        if (body.success) {
          // success, update cached user info
          Storage.user = body.user;
          return true;
        } else {
          // couldn't update (probably wrong parameters)
          return false;
        }
      }
      catch (e) {
        return false;
      }
    });

    return result;
  }

  logout() {
    Storage.user = null;
    Storage.token = null;
    return true;
  }  
}

const auth = new Auth();

export default auth;

window.auth = auth;
