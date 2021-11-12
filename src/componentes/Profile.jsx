import React from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';



function Profile() {
    return (
        <>
        <div><h1>Componente Perfil</h1></div>

        <div className="main-perfil">
            <div className="perfil-card">
                <div className="contratos-publicados">
                    <h5>Contratos Publicados</h5>
                </div>
                <div className="contratos-borradores">
                <h5>Borradores</h5>

                </div>
                <div className="contratos-finalizados">
                <h5>Contratos Finalizados</h5>

                </div>

            </div>

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

export default Profile
