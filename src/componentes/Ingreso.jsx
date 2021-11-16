// import { Switch } from '@mui/material'
// import React, { useState } from 'react'
// import Login from './Login';
import Registro from './Registro';
import { NavLink } from 'react-router-dom';


import './styles/ingreso.css';

export default function Ingreso() {

    // const [sw, setSw] = useState(true);

    // const handleSwitchOnChange = () => {
    //     setSw(!sw)
    // }

    /*
    
            <div>
                Login
                <Switch
                    onChange={handleSwitchOnChange}
                    color="primary"
                />
                Sing up
            </div>
             <div>
                 {sw ? 
                 <Login /> 
                 : 
                 <Registro />
                 } 
            </div>

    */


    return (
        <>
        <div className="ingresoComponent">
           <Registro />
        </div>
        <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>                    <div className="logos-footer">
                <NavLink to={{pathname:"https://www.facebook.com/"}}><img src="/images/facebook.png" alt="facebook logo" /></NavLink>
                        <NavLink to={{pathname:"https://www.instagram.com/"}}>
                        <img src="/images/instagram.png" alt="instagram logo" />
                        </NavLink>
                        
                        <NavLink to={{pathname:"https://www.linkedin.com/"}}>
                        <img src="/images/linkedin.png" alt="linkedin logo" />
                        </NavLink>


                    </div>
                    
                </div>
                <div className="home-derecha">
                    <ul>
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
                            <NavLink to="/registro">Regístrate</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}
