import React from 'react';
import { NavLink } from 'react-router-dom';


function Footer() {
    return (
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
    )
}

export default Footer
