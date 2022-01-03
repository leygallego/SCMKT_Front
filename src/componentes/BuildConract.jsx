import React, { useEffect, useState } from 'react';
import { getDownloadURL, uploadBytesResumable, ref as refStorage } from 'firebase/storage';
import { storage } from '../firebase';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/index';
import './styles/buildContract.css';
import { useModal } from 'react-hooks-use-modal';
import DetalleContratoPreview from './DetalleContratoPreview';
import Swal from 'sweetalert2';
//import LoadFile from './LoadFile/LoadFile';

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export function BuildConract() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [checked, setChecked] = useState(false);
    const [input, setInput] = useState({
        id: '',
        wallet1: '',
        wallet2: '',
        name: '',
        type: '',
        duration: '',
        category: '',
        shortdescription: '',
        longdescription: '',
        amount: '0.00000001',
        coin: '',
        c1: '',
        c2: '',
        status: 'unpublished',
        ownerId: user.id,
        pat:''
    })

    const [errors, setErrors] = useState({});
    const [modalIsOpen] = useState(false);
    const [Modal, open, close, isOpen] = useModal('root', {
        // preventScroll: true,
        // closeOnOverlayClick: false
    });

    const [modalIsOpenFile = modalIsOpen] = useState(false);
    const [ModalFile = Modal, openFile = open, closeFile = close, isOpenFile = isOpen] = useModal('root', {
        // preventScroll: true,
        closeOnOverlayClick: false
    });

    const html = `${input.shortdescription}`
    const contentBlock = htmlToDraft(html);

    const [contentState, setContentState] = useState(
        contentBlock ?
            ContentState.createFromBlockArray(contentBlock.contentBlocks)
            : null
    )

    const [editorState, setEditorState] = useState(() =>
        // EditorState.createEmpty()
        EditorState.createWithContent(contentState)
    );

    const htmlLong = `${input.longdescription}`
    const contentBlockLong = htmlToDraft(htmlLong);

    const [contentStateLong = contentState, setContentStateLong = setContentState] = useState(
        contentBlockLong ?
            ContentState.createFromBlockArray(contentBlockLong.contentBlocks)
            : null
    )

    const [editorStateLong = editorState, setEditorStateLong = setEditorState] = useState(() =>
        // EditorState.createEmpty()
        EditorState.createWithContent(contentStateLong)
    );

    useEffect(() => {
        dispatch(getUsers({}))
    }, [dispatch]);

    function validate(elem) {
        if (input[elem] === '') {
            let inputName = elem.charAt(0).toUpperCase() + elem.slice(1)
            setErrors({ ...errors, [elem]: `The ${inputName} field is required` });
        } else {
            setErrors({ ...errors, [elem]: "" });
        }

        return errors;
    };

    // const uploadFileC1 = (file) => {
    //     if (!file) return;
    //     openFile()
    //     const storageRef = refStorage(storage, `/documents/${user.id ? user.id : 'zzzzzzzzzzzzzzzz'}/${file.name}`)
    //     const uploadTask = uploadBytesResumable(storageRef, file)

    //     uploadTask.on("state_changed", (snapshot) => { },
    //         (err) => console.log(err),
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref)
    //                 .then(url => {
    //                     setInput({
    //                         ...input,
    //                         c1: url
    //                     })
    //                 })
    //                 .then(() => {
    //                     closeFile()
    //                 })
    //         }
    //     )
    // };

    // const uploadFileC2 = (file) => {
    //     if (!file) return;
    //     openFile()
    //     const storageRef = refStorage(storage, `/documents/${file.name}`)
    //     const uploadTask = uploadBytesResumable(storageRef, file)

    //     uploadTask.on("state_changed", (snapshot) => { },
    //         (err) => console.log(err),
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref)
    //                 .then(url => {
    //                     setInput({
    //                         ...input,
    //                         c2: url
    //                     })
    //                 }).then(() => {
    //                     closeFile()
    //                 })
    //         }
    //     )
    // };


    const handleInputChange = (e) => {
        console.log(e.target.value)
        if (e.target.name === 'file-c1') {
            // uploadFileC1(e.target.files[0])
        } else if (e.target.name === 'file-c2') {
            // uploadFileC2(e.target.files[0])
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
    };

    function onChangeValue(e, name) {
        e.preventDefault();
        setInput({
            ...input,
            [name]: e.target.value,
            shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent()))
        })
        setErrors(validate({
            ...input,
            [name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const cancelPublished = (e) => {
        e.preventDefault()
        cancelContract('published')
    }

    const cancelContract = () => {
        Swal.fire({
            title: '¿Está seguro de salir sin guardar el contrato ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.replace(`https://scmkt-4fe6b.web.app/contratos/`)
            }
        })
    }

    const onChangeDuration = (e) => {
        const nameEvent = e.target.name;

        if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
            setInput({
                ...input,
                [nameEvent]: e.target.value,
                shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent()))
            })
        }
    }

    const showPrevious = () => {
        setInput({
            ...input,
            shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent())),
        })

        open()
    }

    return (
        <>
            <div className='wraper-crear' >
                <div className="contractComponent">
                    <div className="contractForm">
                        {/* <form action={(e) => { handleOnSubmit(e) }}> */}
                        <form className='contractForm-form' onSubmit={handleOnSubmit}>
                            <a className='labelForm-buildContract'>Crea un contrato para comenzar a buscar desarrolladores que puedan resolver tus pruebas.</a>
                            <div className="labelInput">
                                <div className="labelForm-buildContract">Nombre del Contrato</div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormCComponent"
                                        type="text"
                                        name="name"
                                        onChange={e => { handleInputChange(e) }}
                                        onBlur={(e) => validate(e.target.name)}
                                    />
                                </div>
                            </div>

                            <div className='combo'>
                                <div>
                                    <div className="labelForm-buildContract">Tipo</div>
                                    <div className="inputForm">
                                        <select className="inputFormCoin" name="type">
                                            <option value="" name='' onChange={e => { onChangeValue(e, 'type') }} ></option>
                                            <option value="Desafío" name='Desafío' onChange={e => { onChangeValue(e, 'type') }}>Desafío</option>
                                            <option value="Solución" name='Solución' onChange={e => { onChangeValue(e, 'type') }}>Solución</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="labelInput">
                                    <div className="labelForm-buildContract">Tiempo</div>
                                    <div className="inputForm">
                                        <input
                                            className="inputFormCComponent"
                                            type="text"
                                            name="duration"
                                            value={input.duration}
                                            min="0"
                                            onChange={onChangeDuration}
                                        />
                                    </div>

                                </div>

                                <div>
                                    <div className="labelForm-buildContract">Categoría</div>
                                    <div className="inputForm">
                                        <select className="inputFormCoin" name="category">
                                            <option value="" name='' onChange={e => { onChangeValue(e, 'category') }} ></option>
                                            <option value="Principiante" name='Principiante' onChange={e => { onChangeValue(e, 'category') }}>Principiante</option>
                                            <option value="Intermedio" name='Intermedio' onChange={e => { onChangeValue(e, 'category') }}>Intermedio</option>
                                            <option value="Avanzado" name='Avanzado' onChange={e => { onChangeValue(e, 'category') }}>Avanzado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='combo'>
                                <div>
                                    <div className="labelForm-buildContract">Recompensa</div>
                                    <div className="inputForm">
                                        <input
                                            className="inputFormReward"
                                            type="number"
                                            min="0.00000001"
                                            max="100"
                                            step="0.00000001"
                                            name="amount"
                                            onChange={e => { handleInputChange(e) }}
                                            onBlur={(e) => validate(e.target.name)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="labelForm-buildContract">Moneda</div>
                                    <div className="inputForm">
                                        {/* <input className="inputFormCoin" type="text" name="name" onChange={e => { handleInputChange(e) }} /> */}
                                        <select className="inputFormCoin" name="coin" onChange={e => { onChangeValue(e, 'coin') }}>
                                            <option value="" name='' onChange={e => { onChangeValue(e, 'coin') }}></option>
                                            <option value="ETH" name='ETH' onChange={e => { onChangeValue(e, 'coin') }}>ETH</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="labelInput">
                                <div className="labelForm-buildContract">Describe tu problema

                                </div>
                                {/* <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="shortdescription"
                                    onChange={e => { handleInputChange(e) }}
                                    rows="2"
                                />
                                </div> */}
                                <div className='input-reach-text'>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={setEditorState}
                                        defaultContentState={contentState}
                                        onContentStateChange={setContentState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                    />
                                </div>
                            </div>


                            <div className="labelInput">
                                <div className="labelForm-buildContract">
                                    Escribe aquí tu test

                                </div>
                                {/* <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="longdescription"
                                    onChange={e => { handleInputChange(e) }}
                                    rows="5"
                                // maxlength="15000"
                                // onBlur={(e) => validate(e.target.name)}
                                />
                            </div> */}
                                <div className='input-reach-text'>
                                    <Editor
                                        editorState={editorStateLong}
                                        onEditorStateChange={setEditorStateLong}
                                        defaultContentState={contentStateLong}
                                        onContentStateChange={setContentStateLong}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="labelForm-buildContract">
                                    Escribe aquí tu Personal-Access-Token:
                                </div>
                                <input type="password" name="pat" onChange={e => { handleInputChange(e) }} />
                            </div>

                            {/*<div className="labelInput-combo">
                                <div className="labelForm-archivoTest">
                                    Sube tu archivo de test.js
                                </div>
                                <div className="inputForm-archivo"><input name='file-c1' id='file-c1' className="seleccion-archivo" type="file" onChange={e => { handleInputChange(e) }} /></div>
                                <div className="inputForm-archivo"><input name='file-c2' id='file-c2' className="seleccion-archivo" type="file" onChange={e => { handleInputChange(e) }} /></div>
                            </div>*/}

                            {/*<ModalFile

                                visible={modalIsOpenFile}>
                                <div className='modal-overlay'>
                                    <LoadFile />
                                </div>
                            </ModalFile>*/}


                            {/* <div className="labelInput">
                            <div className="labelForm">
                                Confirma tu contraseña
                            </div>
                            <div className="inputForm"><input className="inputFormCComponent" type="password" name="password" onChange={e => { handleInputChange(e) }} /></div>
                        </div> */}

                            {/* <div className="labelInput">
                            <div className="labelForm-buildContract terms">
                                Declaro que los datos ingresados son correctos y que los fondos serán transferidos a quien suba un archivo capaz de resolver los tests adjuntos en este formulario
                            </div>
                            <div className="inputForm-checkbox">
                                <Checkbox
                                    checked={checked}
                                    value="checkedA"
                                    size='medium'
                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                    color="default"
                                    onChange={() => setChecked(!checked)}
                                />
                            </div>
                        </div> */}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        // value={checked}
                                        size='medium'
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                        color="default"
                                        onChange={() => setChecked(!checked)}
                                    />
                                }
                                label="Declaro que los datos ingresados son correctos y que los fondos serán transferidos a quien suba un archivo capaz de resolver los tests adjuntos en este formulario"
                            />

                            <h1></h1>
                            <div className='group-button-build'>
                                <button
                                    type='submit'
                                    className={
                                        input.name === "" ||
                                            input.shortdescription === "" ||
                                            input.longdescription === "" ||
                                            input.amount === "" ||
                                            input.coin === "" ||
                                            !checked
                                            ? "acept-contract acept-contract-disable"
                                            : "acept-contract"
                                    }
                                    // variant="outlined"
                                    onClick={showPrevious}
                                    disabled={
                                        input.name === "" ||
                                            input.shortdescription === "" ||
                                            input.longdescription === "" ||
                                            input.amount === "" ||
                                            input.coin === "" ||
                                            !checked
                                            ? true
                                            : false
                                    }
                                >Previsualizar</button>

                                <button
                                    className="acept-contract"
                                    onClick={cancelPublished}>Cancelar</button>
                            </div>
                            <div className={isOpen ? '' : ''} visible={isOpen}>
                                <Modal
                                    visible={modalIsOpen}>
                                    <div className='modal-overlay'>
                                        <DetalleContratoPreview
                                            visible={close}
                                            onClose={close}
                                            dataPreview={input}
                                        // close={close}
                                        />
                                    </div>
                                </Modal>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuildConract;