import { extendObservable, action, reaction } from 'mobx';

class CommonStore {
  constructor() {    
    extendObservable(this, {
      token: window.localStorage.getItem('jwt'),
      user: JSON.parse(window.localStorage.getItem('user'))
    });

    reaction(
      () => this.token, token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );

    reaction(
      () => this.user, user => {
        if (user) {
          window.localStorage.setItem('user', JSON.stringify(user));
        } else {
          window.localStorage.removeItem('user');
        }
      }
    );
  }

}

export default new CommonStore();

//window.store = new CommonStore();
