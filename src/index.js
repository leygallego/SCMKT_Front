import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
    domain="dev-a8q5pol6.us.auth0.com"
    clientId="gws4as2IJJiz2lfMBFOx2G8lieJc4b5N"
    redirectUri={"http://localhost:3000/login"}
    audience="SCMKT"
    scope="openid profile email"
    > 
      <App /> 
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);


