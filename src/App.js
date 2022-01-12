import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './componentes/NavBar';
import Home from './componentes/Home';
import Contratos from './componentes/Contratos';
import AboutUs from './componentes/AboutUs';
import DetalleContrato from './componentes/DetalleContrato';
import Profile from './componentes/Profile';
import BuildContract from './componentes/BuildConract';
import DetalleContratoPub from './componentes/DetalleContratoPub';
import DetalleContratoBor from './componentes/DetalleContratoBor';
import DetalleContratoFin from './componentes/DetalleContratoFin';
import Footer from './componentes/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import Faqs from './componentes/Faqs';

import '../src/componentes/styles/chat.css';
import Chat from './componentes/Chat';
import EditContract from './componentes/EditContract';

import web3 from '@web3-react/core'
import Web3 from 'web3'
import { Web3ReactProvider, WebReactProvider } from '@web3-react/core'
import { MetaMaskContext, MetaMaskProvider } from './hooks/useMetaMask'


function App() {

  const { isAuthenticated } = useAuth0()

  function getLibrary(provider, connector) {
    return new Web3(provider)
  }

  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar}></Route>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/contratos" component={Contratos}></Route>
          <Route exact path="/aboutus" component={AboutUs}></Route>
          <Route exact path="/questions" component={Faqs}></Route>
          <Route exact path="/login" component={Home}></Route>          
          <Route exact path="/detalle/:id" render={({ match }) => <DetalleContrato id={match.params.id} />}></Route>
          
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
              <Route exact path="/creacontrato" component={BuildContract}></Route>
              <Route exact path="/editcontrato/:id" render={({ match }) => <EditContract id={match.params.id} />}></Route>
            {
              isAuthenticated ? (
                <Route exact path="/perfil" component={Profile}></Route>
              )
                : (
                  <Route exact path="/perfil" component={Home}></Route>
                )
            }
          </MetaMaskProvider>
        </Web3ReactProvider>
          
        </Switch>
        <Footer />
      </Router>
      <Chat />
    </div>
  );
}

export default App;
