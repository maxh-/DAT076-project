import { extendObservable, action, reaction } from 'mobx';
import singleton from 'singleton';

class CommonStore extends singleton {

  constructor() {
    extendObservable(this, {
      token: window.localStorage.getItem('jwt'),
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
  }

}

export default new CommonStore();
