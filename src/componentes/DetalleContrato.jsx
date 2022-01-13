import React, { useEffect, useState } from 'react';
import { Octokit } from "octokit";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { ContentState } from 'draft-js';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getContractsByID, removeContract, changeStatusContract, setChat, eraseMessage, setLoading, getUserSuscribed, searchSuscribed, choosedUser } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
// import { useAuth0 } from '@auth0/auth0-react';
// import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import { useModal } from 'react-hooks-use-modal';
import './styles/DetalleContrato.css';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Loader from './Loader';
import ContractStepsResolve from './ContractStepsResolve';
import htmlToDraft from 'html-to-draftjs';
require('dotenv').config();


function DetalleContrato() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const contract = useSelector(state => state.contract);
    const loading = useSelector(state => state.loading);

    const suscribed = useSelector(state => state.userSuscribed);
    // const { getAccessTokenSilently } = useAuth0();

    // const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`;

    const [modalIsOpen] = useState(false);
    const [Modal, open, close, isOpen] = useModal('root', {
    });

    const octokit = new Octokit({

        auth: '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'
    })

    useEffect(() => {
        dispatch(setLoading(true))
        // dispatch(callProtectedApi);
        dispatch(getContractsByID(id));
        dispatch(setLoading(false))
        if (contract.clientId) {
            dispatch(getUserSuscribed(contract.clientId));
        }

        return () => {
            dispatch(removeContract())
        }
    }, [dispatch, contract.clientId, id])

    let html = `${contract?.conditions?.shortdescription ? contract?.conditions?.shortdescription : '<div></div>'}`
    let contentBlock = htmlToDraft(html);
    const { contentBlocks, entityMap } = contentBlock;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    // const htmlToDraftBlocks = (html) => {
    //     const blocksFromHtml = htmlToDraft(html);
    //     const { contentBlocks, entityMap } = blocksFromHtml;
    //     const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //     const editorState = EditorState.createWithContent(contentState);
    //     return editorState;
    // }

    let htmlLong = `${contract?.conditions?.longdescription ? contract?.conditions?.longdescription : '<div></div>'}`
    let contentBlockLong = htmlToDraft(htmlLong);
    const { contentBlocks: contentBlocksLong, entityMap: entityMapLong } = contentBlockLong;
    const contentStateLong = ContentState.createFromBlockArray(contentBlocksLong, entityMapLong);
    const editorStateLong = EditorState.createWithContent(contentStateLong);

    const openChat = (id1, id2) => {
        console.log('OPENCHAT', id1, id2)
        if (id1 !== id2) {
            dispatch(setChat(true));
        }
    }

    function handleClick() {
        dispatch(setChat(false));


        dispatch(eraseMessage([]));
        history.push("/contratos");
    }

    function getInvite() {
        let owner = 'zzzNitro'
        let name = `${contract.conditions.name}`
        let collab = `${user.username}`
        //let file = 'value sacado del state'

        octokit.request(`PUT /repos/${owner}/${name}/collaborators/${collab}`, {
            owner: owner,
            repo: name,
            username: `${collab}`,
            permission: 'push'
        }).then(console.log, console.log)
    }

    function subscribe(contractId, status, clientId) {
        dispatch(setChat(false));
        dispatch(eraseMessage([]));
        dispatch(changeStatusContract(contractId, status, clientId))
        getInvite()
    }

    function unsubscribe(contractId, status, previous) {
        dispatch(changeStatusContract(contractId, status, null, previous))
    }

    const chatSuscribed = (id1, id2) => {
        console.log("Chat privado...", id1, id2)
        console.log('chatSuscribed', suscribed)
        dispatch(getUserSuscribed(id2));
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
        openChat(id1, id2);
    }
    console.log(contract)
    return (
        <>
            {loading
                ? <Loader />
                : <div className='wraper-detalle'>

                    <div className='titulo-detalle' >{`Seleccionaste el contrato ${contract?.conditions?.name ? contract.conditions.name : "Privado"} `}</div>

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

                                        </div> : 
                                        <Button
                                            className="chatIcon"
                                            variant="error"
                                            startIcon={ user.id !== contract.clientId ? <ChatIcon /> : <></>}
                                            onClick={() => {openChat(user.id, contract.owner.id)}}
                                            size='lg'
                                        />}
                                    </div>
                                    <div className="xButton">
                                        <CloseIcon onClick={handleClick} />
                                    </div>
                                </div>
                                
                                <div className='bodyCard'>
                                    <h2>{contract.conditions.name}</h2>
                                    <p>{contract.conditions.type && contract.conditions.type !== 'undefined' ? contract.conditions.type : ''}</p>
                                    {/* Adición de las palabras días y ETH y encapsulado en un div row */}
                                    <div className='daysAmount'>
                                        {/* <div>{contract.conditions.duration && contract.conditions.duration !== 'undefined' ? `Tiempo estimado: ${contract.conditions.duration} días` : ''}</div> */}

                                        <div className='amountText'>
                                            <div className='unEspacio'> {`${'Tiempo estimado:'} `} <span className='espacio' >_</span> </div>
                                            <div><b>{`${contract.conditions.duration}`}</b>{`${' días'}`}</div>
                                        </div>

                                        <div className='amountText'>{`${'Recompensa:'}`} <span className='espacio' >_</span>  <div className='unEspacio' ><b>{contract.conditions.amount}</b><span className='espacio' >_</span>{`${' ETH'}`}</div>
                                        </div>
                                    </div>


                                    <p>{contract.conditions.category && contract.conditions.category !== 'undefined' ? contract.conditions.category : ''}</p>

                                    <div className='input-reach-text-disabled'>
                                        <Editor
                                            toolbarHidden
                                            readOnly={true}
                                            editorState={editorState}
                                            defaultContentState={contentState}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                        />
                                    </div>

                                    <div className='input-reach-text-disabled' >
                                        <Editor
                                            toolbarHidden
                                            readOnly={true}
                                            editorState={editorStateLong}
                                            defaultContentState={contentStateLong}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                        />
                                    </div>

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
                                </div>

                                <div className="group-button-build">
                                    <Button
                                        className="aceptar-contratos"
                                        variant="contained"
                                        onClick={handleClick}
                                        style={{
                                            backgroundColor: "#0078E7",
                                            color: "#FFFFFF"
                                        }}
                                    >Regresar</Button>

                                    {(contract.status !== 'complete' && contract.status !== 'delete' && contract.owner.id === user.id)
                                        ? <div>
                                            <div className="aceptar-contratos">
                                                <NavLink to={`/editcontrato/${id}`}><Button 
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#0078E7",
                                                    color: "#FFFFFF"
                                                }}
                                                >Editar</Button></NavLink>
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
                                                style={{
                                                    backgroundColor: "#0078E7",
                                                    color: "#FFFFFF"
                                                }}
                                            >Resolver</Button>
                                        </div>
                                        : <></>
                                    }

                                    {(contract.status === 'complete' || (contract.clientId && contract.clientId !== user.id) || contract.owner.id === user.id)
                                        ? <></>
                                        : contract.status === 'taken'
                                            ? <Button
                                                className="aceptar-contratos"
                                                style={{
                                                    backgroundColor: "#0078E7",
                                                    color: "#FFFFFF"
                                                }}
                                                variant="contained"
                                                onClick={() => unsubscribe(contract.id, 'published', user.id)}
                                            >Desuscribir</Button>
                                            : <Button
                                                className="aceptar-contratos"
                                                style={{
                                                    backgroundColor: "#0078E7",
                                                    color: "#FFFFFF"
                                                }}
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
