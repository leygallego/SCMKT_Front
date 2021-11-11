import React from 'react';
import './Contratos.css';
import { NavLink } from 'react-router-dom';


function Contratos() {
    return (
        <>
        <div className="main-contratos">
            <h1>Componente Contratos</h1>
            <div className="contratos-card">
                <h2>Nombre Contrato</h2>
                <h1><span>0,000000001</span> </h1>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </div>
            <div className="contratos-card">
                <h2>Nombre Contrato</h2>
                <h1><span>0,000000001</span></h1>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </div>




        </div>
        <div className="footer-home">
                <div className="home-izquierda">
                    <h6>SmartContracts</h6>
                    <div className="logos-footer">
                        <img src="/images/facebook.png" alt="facebook logo" />
                        <img src="/images/instagram.png" alt="instagram logo" />
                        <img src="/images/linkedin.png" alt="linkedin logo" />


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

export default Contratos
