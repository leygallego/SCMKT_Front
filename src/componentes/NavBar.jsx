import React from 'react';
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import './NavBar.css';


function NavBar() {
    return (
        <div>

<div className="navbar">
      <nav>
        <ul>
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
        </ul>
      </nav>
      </div>
             
        </div>
    )
}

export default NavBar
