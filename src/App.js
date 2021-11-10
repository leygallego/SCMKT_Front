import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from './componentes/NavBar';
import Home from './componentes/Home';
import Contratos from './componentes/Contratos';
import AboutUs from './componentes/AboutUs';




function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
        {/* <Route  path="/" element={ <div className="App"><NavBar /></div> }></Route> */}
        <Route  path="/" element={<Home />}></Route>   
        <Route  path="contratos" element={<Contratos />}></Route>  
        <Route  path="aboutus" element={<AboutUs />}></Route>   
     
        </Routes>
     

      </Router>
    </div>
  );
}

export default App;
