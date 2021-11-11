import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './componentes/NavBar';
import Home from './componentes/Home';
import Contratos from './componentes/Contratos';
import AboutUs from './componentes/AboutUs';




function App() {
  return (
    <div className="App">
      <Router>
      <Route  path="/" component={NavBar}></Route>

        <Switch>
        <Route exact path="/home" component={Home}></Route>   
        <Route exact path="/contratos" component={Contratos}></Route>  
        <Route  exact path="/aboutus" component={AboutUs}></Route>   
        </Switch>
     

      </Router>
    </div>
  );
}

export default App;
