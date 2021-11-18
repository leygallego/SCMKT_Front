import './App.css';
import axios from 'axios';
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
import BuildContratc from './componentes/BuildConratc';
import DetalleContratoPub from './componentes/DetalleContratoPub';
import DetalleContratoBor from './componentes/DetalleContratoBor';
import DetalleContratoFin from './componentes/DetalleContratoFin';
import { useAuth0 } from '@auth0/auth0-react';
import { AutoFixOffSharp, ConstructionOutlined } from '@mui/icons-material';

function App() {

  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently
  } = useAuth0();

  function callApi() {
    axios
      .get('http://localhost:3001/')
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message))
  }

  async function callProtectedApi() {
    try{

      const token = await getAccessTokenSilently();
      const response = await axios.get('http://localhost:3001/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }catch(error){
console.log(error.message);
    }
      
    // axios
    //   .get('http://localhost:3001/protected')
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error.message))
  }

  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar}></Route>

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/contratos" component={Contratos}></Route>
          <Route exact path="/aboutus" component={AboutUs}></Route>
          <Route exact path="/detalle" component={DetalleContrato}></Route>
          <Route exact path="/detalleview" component={DetalleView}></Route>
          <Route exact path="/detallecontratospub" component={DetalleContratoPub}></Route>
          <Route exact path="/detallecontratosbor" component={DetalleContratoBor}></Route>
          <Route exact path="/detallecontratosfin" component={DetalleContratoFin}></Route>
          <Route exact path="/perfil" component={Profile}></Route>
          <Route exact path="/registro" component={Ingreso}></Route>
          <Route exact path="/login" component={IngresoUser}></Route>
          <Route exact path="/creacontrato" component={BuildContratc}></Route>



        </Switch>


      </Router>
    </div>
  );
}

export default App;
