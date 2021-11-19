import React, { useEffect, useReducer } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getContractsByID, removeContract } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';


function DetalleContrato(props) {
    const { id } = useParams()
    let dispatch = useDispatch()
    let history = useHistory()
    const contractDetail = useSelector(state => state.contract)
    
    
    console.log(contractDetail)

    useEffect(() => {
        dispatch(getContractsByID(id))
        return () => {
            dispatch(removeContract())
        }
    }, [dispatch, id])

    function handleClick() {
        history.push("contratos");
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
                    <React.Fragment>                        
                        <h2>{contractDetail.conditions.name}</h2>
                        <p>{contractDetail.conditions.shortdescription}</p>
                        <h1><span>{contractDetail.conditions.amount}</span> </h1>
                    </React.Fragment>
                    
                    <Button
                        className="aceptar-contratos"
                        variant="contained"
                        onClick={handleClick}
                    >Aceptar</Button>
  
                  </div>
            </div>

            <div className="footer-home">
                <div className="home-izquierda">
                    <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>                    <div className="logos-footer">
                        <NavLink to={{ pathname: "https://www.facebook.com/" }}><img src="/images/facebook.png" alt="facebook logo" /></NavLink>
                        <NavLink to={{ pathname: "https://www.instagram.com/" }}>
                            <img src="/images/instagram.png" alt="instagram logo" />
                        </NavLink>

                        <NavLink to={{ pathname: "https://www.linkedin.com/" }}>
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

export default DetalleContrato
