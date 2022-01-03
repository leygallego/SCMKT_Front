import React from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { NavLink, useHistory } from 'react-router-dom';

const Detalleview = () => {

    let history = useHistory();

    function handleClick() {
        history.push("perfil");
    }

    return (
        <>
            <div><h1>Detalle Contrato</h1></div>
            <div className="main-detalle">

                <div className="detalle-card">
                    {/* <div className="xButton">
                        <Button
                            variant="contained"
                            onClick={handleClick}>
                            X
                        </Button>
                    </div> */}
                    <h2>Nombre del Contrato</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <h1><span>0,000000001</span> </h1>
                    <Button
                        className="publicar-contratos"
                        variant="contained"
                        onClick={handleClick}
                    >Post
                    </Button>
                    <Button
                        className="aceptar-contratos"
                        variant="contained"
                        onClick={handleClick}
                    >Save a copy
                    </Button>
                </div>
            </div>

            <div className="footer-home">
                <div className="home-izquierda">
                    <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>                    <div className="logos-footer">
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

                        <li>
                            <NavLink to="/registro">Regístrate</NavLink>
                        </li>
                    </ul>

                </div>
            </div>

        </>
    )
}

export default Detalleview;
