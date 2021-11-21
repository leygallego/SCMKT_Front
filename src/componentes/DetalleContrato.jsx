import React, { useEffect } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { getContractsByID, removeContract } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';


function DetalleContrato(props) {
    const { id } = useParams()
    let dispatch = useDispatch()
    let history = useHistory()
    const contract = useSelector(state => state.contract)
    
    
    console.log(contract)

    useEffect(() => {
        dispatch(getContractsByID(id))
        return () => {
            dispatch(removeContract())
        }
    }, [dispatch, id])

    function handleClick() {
        history.push("/contratos");
    }
    

    return (
        <>
            <div><h1>Detalle Contrato</h1></div>
            <div className="main-detalle">
            { contract?.conditions?.name ?
                <div className="detalle-card">
                <div className="xButton">
                    <Button
                        variant="contained"
                        onClick={handleClick}>
                        X
                    </Button>
                </div>
                <h2>{contract.conditions.name}</h2>
                <p>{contract.conditions.shortdescription}</p>
                <p>{contract.conditions.longdescription}</p>
                <h1><span>{contract.conditions.amount}</span> </h1>
                
                <Button
                    className="aceptar-contratos"
                    variant="contained"
                    onClick={handleClick}
                >Aceptar</Button>

              </div>
              :
              <div>Cargando...</div>
            }
            </div>
        </>
    )
}

export default DetalleContrato
