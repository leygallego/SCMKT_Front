import React from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';


function Profile() {
    return (
        <>
        <div><h1>Componente Perfil</h1></div>

        <div className="main-perfil">
            <div className="perfil-card">
                <h4>Bienvenido (nombre de usuario)</h4>

                <div className="contratos-publicados">
                    <h5>Contratos Publicados</h5>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                </div>
                <div className="contratos-borradores">
                <h5>Borradores</h5>
                <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>

                </div>
                <div className="contratos-finalizados">
                <h5>Contratos Finalizados</h5>
                <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <h6>Ver más detalles</h6>
                    </div>

                </div>

            </div>

            <div className="area-perfil">
            <img src="/images/silueta.png" alt="imagen de silueta" />
                
            <Button
                            className="busca-wallet"
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                        >Wallet Address</Button>
                    <div className="datos-personales" >
                    <Button
                            className="busca-datos"
                            variant="contained"
                            startIcon={<CreateIcon />}
                        >Datos Personales</Button> 
                        <h6>Fulano de tal</h6> 
                        <h6>Wakanda</h6>
                        <h6>fulano@gmail.com</h6>
                        <h6>25/01/2001</h6>
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
