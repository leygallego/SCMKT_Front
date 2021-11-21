import React from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const Detallecontratofin = () => {

    let history = useHistory();

    function handleClick() {
        // ... código para guardar en la base de datos Publicar
        history.push("perfil");
    }


    return (
        <>
            <div><h1>Detalle Contrato</h1></div>
            <div className="main-detalle">

                <div className="detalle-card">
                    <div className="xButton">
                        <Button
                            variant="contained"
                            onClick={handleClick}>
                            X
                        </Button>
                    </div>
                    <h2>Nombre del Contrato</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <h1><span>0,000000001</span> </h1>
                </div>
            </div>
        </>
    )
}


export default Detallecontratofin;
