import { extendObservable, action, reaction } from 'mobx';

class CommonStore {
  constructor() {    
    extendObservable(this, {
      token: window.localStorage.getItem('jwt'),
      user: window.localStorage.getItem('jwt'),
      appLoaded: false,
      setToken: action((token) => {
        this.token = token;
      }),
      removeToken: action(() => {
        this.token = null;
      })
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
        }
      }
    );
  }

}

export default new CommonStore();
