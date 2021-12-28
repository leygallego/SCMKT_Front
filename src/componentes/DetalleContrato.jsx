import React, { useEffect } from 'react';
import './DetalleContrato.css';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getContractsByID, removeContract, sendLogin, changeStatusContract, setChat, configChannel, eraseMessage } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function DetalleContrato() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const contract = useSelector(state => state.contract);
    const { getAccessTokenSilently } = useAuth0();

    const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`;

    useEffect(() => {
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

    function handleClickEdit() {
        history.push("/contratos");
        window.location.replace(`${urlWork}/contratos/edit/${id}`)
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
                        <p>
                            <div>
                                {/* <div className="labelForm-buildContract">Tipo</div> */}
                                <div className="inputForm">
                                    <select className="inputFormCoin-disabled" disabled={true} name="type" value={contract.conditions.type}>
                                        <option value="" name=''></option>
                                        <option value="type1" name='type1'>Tipo 1</option>
                                        <option value="type2" name='type2'>Tipo 2</option>
                                        <option value="type3" name='type3'>Tipo 3</option>
                                    </select>
                                </div>
                            </div>
                        </p>
                        <p>{contract.conditions.duration}</p>
                        <p><select className="inputFormCoin-disabled" disabled={true} name="category" value={contract.conditions.category}>
                            <option value="" name=''></option>
                            <option value="beginner" name='Principiante'>Principiante</option>
                            <option value="intermediate" name='Intermedio'>Intermedio</option>
                            <option value="advanced" name='Avanzado'>Avanzado</option>
                        </select></p>
                        <p>{contract.conditions.shortdescription}</p>
                        <p>{contract.conditions.longdescription}</p>
                        <h1><span>{contract.conditions.amount}</span> </h1>

                        <div className="group-button-build">
                            <Button
                                className="aceptar-contratos"
                                variant="contained"
                                onClick={handleClick}
                            >Aceptar</Button>

                            {(contract.status != 'complete' && contract.status != 'delete' && contract.owner.id === user.id)
                                ? <div>
                                    <div className="aceptar-contratos">
                                        <NavLink to={`/editcontrato/${id}`}><Button variant="contained">Editar</Button></NavLink>
                                    </div>

                                </div>
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
