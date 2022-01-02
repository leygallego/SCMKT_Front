import React, { useEffect, useState } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getContractsByID, removeContract, sendLogin, changeStatusContract, setChat, eraseMessage, setLoading, getUserSuscribed, searchSuscribed, choosedUser } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Loader from './Loader';

function DetalleContrato() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const contract = useSelector(state => state.contract);
    const loading = useSelector(state => state.loading);
    const suscribed = useSelector(state => state.userSuscribed);
    // console.log("CONTRACT =====", contract);
    const { getAccessTokenSilently } = useAuth0();

    const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`;

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(callProtectedApi);
        if (contract.clientId) {
            dispatch(getUserSuscribed(contract.clientId));
        }
        return () => {
            dispatch(removeContract())
        }
    }, [dispatch])

    const openChat = () => {
        dispatch(setChat(true));
    }

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            await (dispatch(sendLogin(token)))
            dispatch(getContractsByID(id));
            dispatch(setLoading(false))
        } catch (error) {
            console.log('Error en el Detalle de Contratos ', error)
        }
    }

    function handleClick() {
        dispatch(setChat(false));
        dispatch(eraseMessage([]));
        history.push("/contratos");
    }

    function subscribe(contractId, status, clientId) {
        dispatch(setChat(false));
        dispatch(eraseMessage([]));
        dispatch(changeStatusContract(contractId, status, clientId))
    }

    function unsubscribe(contractId, status) {
        dispatch(changeStatusContract(contractId, status, null))
    }

    const chatSuscribed = (id1, id2) => {
        console.log("Chat privado...", id1, id2)
        console.log('chatSuscribed', suscribed)
        dispatch(searchSuscribed(
            {
                "id1": id1,
                "id2": id2
            }
        ));
        dispatch(choosedUser(
            {
                "name": suscribed.name,
                "id": suscribed.id,
                "image": suscribed.image
            },
        ));
        openChat();
    }

    return (
        <>
            {loading
                ? <Loader />
                : <div>

                    <div><h1>{`Seleccionaste el contrato ${contract?.conditions?.name ? contract.conditions.name : "Privado"} `}</h1></div>
                    <div className="main-detalle">

                        {contract?.conditions?.name ?
                            <div className="detalle-card">
                                <div className='contractDetailButton'>
                                    <div className='contractsChat'>

                                        {contract.clientId ? <div>
                                            <div className="userDataComponent">
                                                <div className="caja">
                                                    <div className="box">
                                                        <img src={suscribed.image}
                                                            width="60"
                                                            alt='suscrito'
                                                            onClick={() => { chatSuscribed(user.id, contract.clientId) }}
                                                        />                    </div>
                                                </div>
                                                <h5>Suscrito</h5>

                                            </div>

                                        </div> : <Button
                                            className="chatIcon"
                                            variant="error"
                                            startIcon={<ChatIcon />}
                                            onClick={openChat}
                                            size='lg'
                                        />}
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
                                <p>{contract.conditions.type}</p>
                                <p>{contract.conditions.duration}</p>
                                <p>{contract.conditions.category}</p>
                                <p>{contract.conditions.shortdescription}</p>
                                <p>{contract.conditions.longdescription}</p>
                                <h1><span>{contract.conditions.amount}</span> </h1>

                                <div className="group-button-build">
                                    <Button
                                        className="aceptar-contratos"
                                        variant="contained"
                                        onClick={handleClick}
                                    >Aceptar</Button>

                                    {(contract.status !== 'complete' && contract.status !== 'delete' && contract.owner.id === user.id)
                                        ? <div>
                                            <div className="aceptar-contratos">
                                                <NavLink to={`/editcontrato/${id}`}><Button variant="contained">Editar</Button></NavLink>
                                            </div>

                                        </div>
                                        : <></>
                                    }

                                    {(contract.status === 'complete' || (contract.clientId && contract.clientId !== user.id) || contract.owner.id === user.id)
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
                </div>
            }
        </>
    )
}

export default DetalleContrato
