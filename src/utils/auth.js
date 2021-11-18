import auth from 'auth0-js';

const Auth = () => {
  const auth0 = new auth0.WebAuth({
    domain: 'dev-arajz3nk.us.auth0.com',
    clientID: 'tqGdA0unQYnaS7XULxEsloIrFBF6aIbX',
    redirectUri: 'http://localhost:3000',
    responseTye: 'token id_token',
    scope: 'openid profile email'
  })
  
  let login = () => {
    this.auth0.authorize()
  }
}

export default Auth;