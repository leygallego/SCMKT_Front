import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';

function NavBar() {
const [showLinks, setShowLinks] = useState(false);

    return (
        <div>

<div className="navbar">
      <nav>
      <div className="links" id={showLinks ? "hidden" : ""}>
      <ul>
        {/* <button className="reorder-button" onClick={()=> setShowLinks(!showLinks)}>
            <ReorderIcon />
          </button> */}
          
          <li>
            <NavLink to="/"> <span>SmartContracts</span> </NavLink>
          </li>
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/contratos">Contratos</NavLink>
          </li>
          <li>
            <NavLink to="/aboutus">Quiénes Somos</NavLink>
          </li>
          <li>
         <NavLink to="/registro"> <Button variant="contained">Sign up</Button> </NavLink>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
        
      </nav>
      </div>
             
        </div>
    )
}

export default NavBar
