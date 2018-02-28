import { extendObservable, action, reaction } from 'mobx';

class CommonStore {

  constructor() {
    //super();
    
    extendObservable(this, {
      token: window.localStorage.getItem('jwt'),
      appLoaded: false,
      setToken: action((token) => {
        this.token = token;
      }),
      removeToken: action(() => {
        this.token = null;
      }),
      getToken() {
        if(this.token) {
          return this.token;
        } else {
          return null;
        }
      }
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
