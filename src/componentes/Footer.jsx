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
                    <a href="https://facebook.com" target='_blank' rel='noopener noreferrer'><img src="/images/facebook.png" alt="facebook logo" /></a>
                    <a href="https://instagram.com" target='_blank' rel='noopener noreferrer'><img src="/images/instagram.png" alt="instagram logo" /></a>
                    <a href="https://linkedin.com" target='_blank' rel='noopener noreferrer'><img src="/images/linkedin.png" alt="linkedin logo" /></a>
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
                        isAuthenticated ? (
                            <div>
                                <li>
                                    <NavLink to="/perfil">Mi Cuenta</NavLink>
                                </li>
                            </div>
                        )
                            : (
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
