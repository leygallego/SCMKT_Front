import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Auth0Provider } from '@auth0/auth0-react';
import queryString from 'query-string';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from './config/app.config.js';

/*
async function prompt() {
  if (queryString.parse(window.location.search).error === 'required_login') {
    return "true";
  }
  else {
    return "consent";
  }
}
*/
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
  prompt().then(function(result) {
  return result;
});
}
/*
if (queryString.parse(window.location.search).error === 'login_required') {
  window.sessionStorage.setItem('prompt', 'consent');
}
else {
  window.sessionStorage.setItem('prompt', 'none');
}
*/
//"http://localhost:3000/perfil" || "https://henryfront.surge.sh/perfil"



//console.log(window.sessionStorage.getItem('prompt'));

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
  scope="openid profile email"
  prompt= {call_prompt()}
  > 
    <App /> 
  </Auth0Provider>
</Provider>,
  document.getElementById('root')
);


