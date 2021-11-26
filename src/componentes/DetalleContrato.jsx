import React, { useEffect } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { getContractsByID, removeContract, getContractsPreview } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";

function DetalleContrato(props) {
    const { id } = useParams()
    const { isPreview, dataPreview } = props

    let dispatch = useDispatch()
    let history = useHistory()
    const contract = useSelector(state => state.contract)

    console.log('contract', contract)

    useEffect(() => {
        if (isPreview=='Y'){
            dispatch(getContractsPreview(dataPreview))
        }else {
            dispatch(getContractsByID(id))
            return () => {
                dispatch(removeContract())
            }
        }
    }, [dispatch, id])

    function handleClick() {
        history.push("/contratos");
    }


    return (
        <Modal>
            <div><h1>Detalle Contrato</h1></div>
            <div className="main-detalle">
                {contract?.conditions?.name ?
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
        </Modal>
    )
}

export default DetalleContrato
