import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/Footer.css';

function Footer() {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    
    return (
        <div className="footerComponent">
                                <div className='divisor-home'></div>

            <div className="row">
            <div className="home-izquierda">
                <h5>SmartContracts</h5>
                <div className="logos-footer">
                    <a href="https://facebook.com" target='_blank' rel='noopener noreferrer'><img src="/images/facebook.png" alt="facebook logo" /></a>
                    <a href="https://instagram.com" target='_blank' rel='noopener noreferrer'><img src="/images/instagram.png" alt="instagram logo" /></a>
                    <a href="https://linkedin.com" target='_blank' rel='noopener noreferrer'><img src="/images/linkedin.png" alt="linkedin logo" /></a>
                </div>
            </div>

            <div className="home-derecha">
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/contratos">Contratos</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/aboutus">Quiénes Somos</NavLink>
                    </li>
                    {
                        isAuthenticated ? (
                            <div>
                                <li>
                                    <NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/perfil">Mi Cuenta</NavLink>
                                </li>
                            </div>
                        )
                            : (
                                <div className='boton-registrarse'>
                                    <li >
                                        <button className={({ isActive }) => (isActive ? "active" : "noActive")} onClick={loginWithRedirect} >Regístrate</button>
                                    </li>
                                </div>
                            )
                    }

                </ul>
                </div> </div>
        </div>
    )
}

export default Footer
