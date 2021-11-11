import React from 'react';
import { NavLink } from 'react-router-dom';


function AboutUs() {
    return (
        <div>
            <h1>Componente Quiénes Somos</h1>

            <div className="about-container">
                <img src="/images/about.png" alt="imagen about" />
            </div>

            <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>
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
        </div>
    )
}

export default AboutUs
