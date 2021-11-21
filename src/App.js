import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './componentes/NavBar';
import Home from './componentes/Home';
import Contratos from './componentes/Contratos';
import AboutUs from './componentes/AboutUs';
import DetalleContrato from './componentes/DetalleContrato';
import DetalleView from './componentes/DetalleView';
import Profile from './componentes/Profile';
import Ingreso from './componentes/Ingreso';
import IngresoUser from './componentes/IngresoUser';
import BuildContract from './componentes/BuildConract';
import DetalleContratoPub from './componentes/DetalleContratoPub';
import DetalleContratoBor from './componentes/DetalleContratoBor';
import DetalleContratoFin from './componentes/DetalleContratoFin';
import { useAuth0 } from '@auth0/auth0-react'



function App() {

  const { isAuthenticated } = useAuth0()

  return (
    <div className="App">
      <Router>
      <Route  path="/" component={NavBar}></Route>

        <Switch>
        <Route exact path="/" component={Home}></Route>   
        <Route exact path="/contratos" component={Contratos}></Route>  
        <Route exact path="/aboutus" component={AboutUs}></Route>  
        <Route exact path="/detalle/:id" render={({match})=> <DetalleContrato id={match.params.id} />}></Route>
        <Route exact path="/detalleview" component={DetalleView}></Route>
        <Route exact path="/detallecontratospub" component={DetalleContratoPub}></Route>
        <Route exact path="/detallecontratosbor" component={DetalleContratoBor}></Route>
        <Route exact path="/detallecontratosfin" component={DetalleContratoFin}></Route>
        {
          isAuthenticated? (
            <Route exact path="/perfil" component={Profile}></Route>
          )
          :(
            <Route exact path="/perfil" component={Ingreso}></Route>
          )
        }
        <Route exact path="/registro" component={Ingreso}></Route>
        <Route exact path="/login" component={IngresoUser}></Route>   
        <Route exact path="/creacontrato" component={BuildContract}></Route>   
        </Switch>
      </Router>
    </div>
  );
}

export default App;
