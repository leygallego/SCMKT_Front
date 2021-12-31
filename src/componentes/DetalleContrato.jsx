import React, { useEffect, useState } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getContractsByID, removeContract, sendLogin, changeStatusContract, setChat, eraseMessage, setLoading } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Loader from './Loader';
import { useModal } from 'react-hooks-use-modal';
import ContractStepsResolve from './ContractStepsResolve';

function DetalleContrato() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const contract = useSelector(state => state.contract);
    const loading = useSelector(state => state.loading);
    const { getAccessTokenSilently } = useAuth0();

    const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`;

    const [modalIsOpen] = useState(false);
    const [Modal, open, close, isOpen] = useModal('root', {
        // preventScroll: true,
        // closeOnOverlayClick: false
    });

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(callProtectedApi);
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
        // dispatch(configChannel(""));
        dispatch(eraseMessage([]));
        history.push("/contratos");
    }

    function subscribe(contractId, status, clientId) {
        dispatch(setChat(false));
        // dispatch(configChannel(""));
        dispatch(eraseMessage([]));
        dispatch(changeStatusContract(contractId, status, clientId))
    }

    function unsubscribe(contractId, status) {
        dispatch(changeStatusContract(contractId, status, null))
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
                                <p>{contract.conditions.type && contract.conditions.type !== 'undefined'? contract.conditions.type : ''}</p>
                                <p>{contract.conditions.duration && contract.conditions.duration !== 'undefined'? contract.conditions.duration : ''}</p>
                                <p>{contract.conditions.category && contract.conditions.category !== 'undefined'? contract.conditions.category : ''}</p>
                                <p>{contract.conditions.shortdescription}</p>
                                <p>{contract.conditions.longdescription}</p>
                                <h1><span>{contract.conditions.amount}</span> </h1>

                                <div className={isOpen ? '' : ''} visible={isOpen}>
                                    <Modal
                                        visible={modalIsOpen}>
                                        <div className='modal-overlay'>
                                            <ContractStepsResolve
                                                id={contract.id}
                                                visible={close}
                                                onClose={close}
                                            // close={close}
                                            />
                                        </div>
                                    </Modal>
                                </div>

                                <div className="group-button-build">
                                    <Button
                                        className="aceptar-contratos"
                                        variant="contained"
                                        onClick={handleClick}
                                    >Regresar</Button>

                                    {(contract.status !== 'complete' && contract.status !== 'delete' && contract.owner.id === user.id)
                                        ? <div>
                                            <div className="aceptar-contratos">
                                                <NavLink to={`/editcontrato/${id}`}><Button variant="contained">Editar</Button></NavLink>
                                            </div>

                                        </div>
                                        : <></>
                                    }

                                    {(contract.status === 'taken' && ((contract.clientId && contract.clientId === user.id) || contract.owner.id === user.id))
                                        ? <div>
                                            <Button
                                                className="aceptar-contratos"
                                                variant="contained"
                                                onClick={open}
                                            >Resolver</Button>
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
