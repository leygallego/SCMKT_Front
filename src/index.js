import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import queryString from 'query-string';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from './config/app.config.js';
import './index.css';


async function prompt() {
  if (await queryString.parse(window.location.search).error === 'login_required') {
    console.log('consent')
    return 'consent';
  }
  else {
    console.log('none');
    return 'none';
  }
}

function call_prompt() {
  prompt().then(function (result) {
    return result;
  });
}



ReactDOM.render(
  <Provider store={store}>
  <Auth0Provider
  domain="dev-a8q5pol6.us.auth0.com"
  clientId="gws4as2IJJiz2lfMBFOx2G8lieJc4b5N"
  redirectUri={
    `${NODE_ENV==='production'? urlProduction : `${urlDevelop}:${port2}`}/perfil` // Deploy
    // "http://localhost:3000/perfil"
    // "https://scmkt-4fe6b.web.app/perfil"
  }
  //response_type='id_token token'
  audience="SCMKT"
  scope="openid profile email repo"
  prompt= {call_prompt()}
  >
    <App /> 
  </Auth0Provider>
</Provider>,

  document.getElementById('root')
);


