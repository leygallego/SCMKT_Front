import React, { useEffect } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import {
    getContractsByID, removeContract,
    sendLogin, changeStatusContract, setChat,
    choosedUser
} from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import EditContract from './EditContract';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function DetalleContrato() {
    const { id } = useParams()
    let dispatch = useDispatch()
    let history = useHistory()
    const user = useSelector(state => state.user)
    const contract = useSelector(state => state.contract)
    const { getAccessTokenSilently } = useAuth0()

    const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`

    useEffect(() => {
        dispatch(callProtectedApi)
        return () => {
            dispatch(removeContract())
        }
    }, [dispatch, id])

    const openChat = () => {
        console.log(contract.owner)
        dispatch(choosedUser(
            {
                "name": contract.owner.name,
                "id": contract.owner.id,
                "image": contract.owner.image
            },
        ))
        dispatch(setChat());
    }

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            await (dispatch(sendLogin(token)))
            dispatch(getContractsByID(id))
        } catch (error) {
            console.log('Error en el Detalle de Contratos ', error)
        }
    }

    function handleClick() {
        history.push("/contratos");
    }

    function handleClickEdit() {
        history.push("/contratos");
        window.location.replace(`${urlWork}/contratos/edit/${id}`)
    }

    function subscribe(contractId, status, clientId) {
        dispatch(changeStatusContract(contractId, status, clientId))
    }

    function unsubscribe(contractId, status) {
        dispatch(changeStatusContract(contractId, status, null))
    }

    return (
        <>
            <div><h1>Detalle Contrato</h1></div>
            <div className="main-detalle">

                {contract?.conditions?.name ?
                    <div className="detalle-card">
                        <div className='contractDetailButton'>
                            <div className='contractsChat'>
                                <Button
                                    className="chatIcon"
                                    variant="error"
                                    startIcon={<ChatIcon />}
                                    onClick={openChat}
                                    size='lg'
                                />
                            </div>

                            <div className="xButton">
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                    startIcon={<CloseIcon />}
                                >

                                </Button>
                            </div>
                        </div>


                        <h2>{contract.conditions.name}</h2>
                        <p>{contract.conditions.shortdescription}</p>
                        <p>{contract.conditions.longdescription}</p>
                        <h1><span>{contract.conditions.amount}</span> </h1>

                        <div>
                            <Button
                                className="aceptar-contratos"
                                variant="contained"
                                onClick={handleClick}
                            >Aceptar</Button>

                            {(contract.status != 'complete' && contract.status != 'delete' && contract.owner.id === user.id)
                                ? <Button
                                    className="aceptar-contratos"
                                    variant="contained"
                                    onClick={handleClickEdit}
                                >Editar</Button>
                                : <></>
                            }

                            {(contract.status === 'complete' || (contract.clientId && contract.clientId != user.id) || contract.owner.id === user.id)
                                ? <></>
                                : contract.status === 'taken'
                                    ? <Button
                                        className="aceptar-contratos"
                                        variant="contained"
                                        onClick={() => unsubscribe(contract.id, 'published')}
                                    >Desuscribir</Button>
                                    : <Button
                                        className="aceptar-contratos"
                                        variant="contained"
                                        onClick={() => subscribe(contract.id, 'taken', user.id)}
                                    >Suscribirse</Button>
                            }
                        </div>
                    </div>
                    :
                    <div>Cargando...</div>
                }
            </div>
        </>
    )
}

export default DetalleContrato
