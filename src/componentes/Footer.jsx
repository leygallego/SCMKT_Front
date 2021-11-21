import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

function Footer() {
    const { isAuthenticated } = useAuth0()

    return (
        <div className="footer-home">
                <div className="home-izquierda">
                    <h6>SmartContracts</h6>
                    <div className="logos-footer">
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
                        {
                            isAuthenticated? (
                                <div>
                                    <li>
                                        <NavLink to="/perfil">Mi Cuenta</NavLink>
                                    </li>
                                </div>
                            )
                            :(
                                <div>
                                    <li>
                                        <NavLink to="/registro">Regístrate</NavLink>
                                    </li>
                                </div>
                            )
                        }
                        
                    </ul>

                </div>
            </div>
    )
}

export default Footer
