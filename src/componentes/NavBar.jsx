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
            <NavLink to="/home"> <span>SmartContracts</span> </NavLink>
          </li>
          <li>
            <NavLink to="/home">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/contratos">Contratos</NavLink>
          </li>
          <li>
            <NavLink to="/aboutus">Quiénes Somos</NavLink>
          </li>
          <li>
         <NavLink to="/registro"> <Button variant="contained">Login</Button> </NavLink> 
          </li>
        </ul>
      </nav>
      </div>
             
        </div>
    )
}

export default NavBar
