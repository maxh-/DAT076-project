import { get, post } from 'axios';
import { extendObservable, computed } from 'mobx';
import jwt from 'jsonwebtoken';
import singleton from 'singleton';

import Storage from './commonStore';

class Auth extends singleton {
  constructor() {
    super();

    extendObservable(this, {
      user: null,
      get isLoggedIn() {
        return !!this.user;
      }
    });

    const token = Storage.get('token');

    if (token) {
      this.user = jwt.verify(token, 'secret');
    }
  }

  login(username, password) {
    return post('/auth/login', {
      username, password
    })
      .then(res => {
        this.user = res.user;
        Storage.setToken(res.token);
      });
  }

  logout() {
    Storage.removeToken();
    return get('/auth/logout');
  }
}

export default Auth.get();
