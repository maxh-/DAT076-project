import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
         render={(props) => (
           Auth.isLoggedIn === true
             ? <Component {...props} />
             : <Redirect to='/login' />
         )} />
)

export default PrivateRoute;
