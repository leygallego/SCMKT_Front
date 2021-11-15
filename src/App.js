import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './componentes/NavBar';
import Home from './componentes/Home';
import Contratos from './componentes/Contratos';
import AboutUs from './componentes/AboutUs';
import DetalleContrato from './componentes/DetalleContrato';
import Profile from './componentes/Profile';
import Ingreso from './componentes/Ingreso';
import IngresoUser from './componentes/IngresoUser';
import BuildContratc from './componentes/BuildConratc';


function App() {
  return (
    <div className="App">
      <Router>
      <Route  path="/" component={NavBar}></Route>

        <Switch>
        <Route exact path="/" component={Home}></Route>   
        <Route exact path="/contratos" component={Contratos}></Route>  
        <Route  exact path="/aboutus" component={AboutUs}></Route>  
        <Route  exact path="/detalle" component={DetalleContrato}></Route>
        <Route  exact path="/perfil" component={Profile}></Route>   
        <Route  exact path="/registro" component={Ingreso}></Route>
        <Route  exact path="/login" component={IngresoUser}></Route>   
        <Route  exact path="/creacontrato" component={BuildContratc}></Route>   
        
   
 
        </Switch>
     

      </Router>
    </div>
  );
}

export default App;
