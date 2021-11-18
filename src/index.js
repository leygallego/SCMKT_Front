import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain='dev-arajz3nk.us.auth0.com'
      clientId='tqGdA0unQYnaS7XULxEsloIrFBF6aIbX'
      redirectUri={window.location.origin}
      audience='IdenMP'
      scope='openid profile email'
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);


