import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, uploadBytesResumable, ref as refStorage } from 'firebase/storage';
import { storage } from '../firebase';
// import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import { updateContract } from '../actions/index.js';
import './styles/buildContract.css';
import { useModal } from 'react-hooks-use-modal';
// import DetalleContratoPreview from './DetalleContratoPreview';
import Swal from 'sweetalert2';
import LoadFile from './LoadFile/LoadFile';

import './styles/EdictContract.css';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export function EditContract() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const contract = useSelector(state => state.contract)
    const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`

    const [checked, setChecked] = useState(false);
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [showFile1, setShowFile1] = useState(false);
    const [showFile2, setShowFile2] = useState(false);
    const [input, setInput] = useState({
        id: contract.id,
        wallet1: contract.wallet1,
        wallet2: contract.wallet2,
        author: contract.author,
        name: contract.conditions.name,
        type: contract.conditions.type,
        duration: contract.conditions.duration,
        category: contract.conditions.category,
        shortdescription: contract.conditions.shortdescription,
        longdescription: contract.conditions.longdescription,
        amount: contract.conditions.amount,
        coin: contract.conditions.coin,
        instructions: contract.conditions.instructions ? contract.conditions.instructions : '',
        c1: contract.conditions.condition.c1 && contract.conditions.condition.c1 !== undefined ? contract.conditions.condition.c1 : null,
        c2: contract.conditions.condition.c2 && contract.conditions.condition.c2 !== undefined ? contract.conditions.condition.c2 : null,
        status: contract.status,
        clientId: contract.clientId
    })

    const [errors, setErrors] = useState({});
    const [modalIsOpen] = useState(false);
    const [Modal, open, close] = useModal('root', {
        // preventScroll: true,
        closeOnOverlayClick: false
    });

    // let _contentState = ContentState.createFromText(`${input.shortdescription}`);
    // let raw = convertToRaw(_contentState)
    const html = `${contract.conditions.shortdescription}`
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

    const [contentStateLong, setContentStateLong] = useState(
        contentBlockLong ?
            ContentState.createFromBlockArray(contentBlockLong.contentBlocks)
            : null
    )

    const [editorStateLong, setEditorStateLong] = useState(() =>
        // EditorState.createEmpty()
        EditorState.createWithContent(contentStateLong)
    );

    useEffect(() => {
        //dispatch(getUsers({}))
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

    const uploadFileC1 = (file) => {
        if (!file) return;
        open()
        const storageRef = refStorage(storage, `/documents/${id}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setInput({
                            ...input,
                            c1: url
                        })
                        setFile1(file.name)
                    })
                    .then(() => {
                        close()
                    })
            }
        )
    };

    const uploadFileC2 = (file) => {
        if (!file) return;
        open()
        const storageRef = refStorage(storage, `/documents/${id}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setInput({
                            ...input,
                            c2: url
                        })
                        setFile2(file.name)
                    })
                    .then(() => {
                        close()
                    })
            }
        )
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'file-c1') {
            // setArchivo1(e.target.files[0]);
            uploadFileC1(e.target.files[0])
        } else if (e.target.name === 'file-c2') {
            uploadFileC2(e.target.files[0])
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
            [name]: e.target.value
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
            // showCancelButton: true,
            confirmButtonText: 'Sí',
            // denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.replace(`${urlWork}/contratos/`)
            }
        })
    }

    const saveContract = (status = '') => {
        let nweC = {
            id: input.id,
            wallet1: input.wallet,
            wallet2: input.wallet2,
            author: input.author,
            conditions: {
                name: input.name,
                type: input.type,
                duration: input.duration,
                category: input.category,
                shortdescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                longdescription: draftToHtml(convertToRaw(editorStateLong.getCurrentContent())),
                amount: input.amount,
                coin: input.coin,
                instructions: input.instructions,
                condition: {
                    c1: input.c1,
                    c2: input.c2
                }
            },
            status: status === '' ? input.status : status,
            clientId: input.clientId,
            ownerId: user.id
        }

        Swal.fire({
            title: '¿Deseas guardar los cambios?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(updateContract(nweC))

                Swal.fire('¡Guardado!', '', 'success')
                    .then((result) => {
                        //window.location.replace("https://scmkt-4fe6b.web.app/perfil/")
                        // window.location.replace(`http://localhost:3000/perfil`)
                        window.location.replace(`${urlWork}/perfil/`)

                    })
            } else if (result.isDenied) {
                Swal.fire('No se ha guardado ningún cambio', '', 'info')
            }
        })
    }

    const onChangeDuration = (e) => {
        const nameEvent = e.target.name;

        if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
            console.log('asdf')
            setInput({
                ...input,
                [nameEvent]: e.target.value
            })
        }
    }

    return (
        <>
            <div className="contractComponent">
                <div className="contractForm">
                    {/* <form action={(e) => { handleOnSubmit(e) }}> */}
                    <form className='contractForm-form' onSubmit={handleOnSubmit}>
                        {/* <a className='labelForm-buildContract'>Crea un contrato para comenzar a buscar desarrolladores que puedan resolver tus pruebas.</a> */}
                        {/* <br/><br/> */}
                        <div className="labelInput">
                            <div className="labelForm-buildContract">Nombre del Contrato</div>
                            <div className="inputForm-nombre">
                                <input
                                    className="inputFormCComponent"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={e => { handleInputChange(e) }}
                                    onBlur={(e) => validate(e.target.name)}
                                />
                            </div>
                        </div>

                        <div className='tiempoRecompensa'>
                            <div className="labelInput">
                                <div className="labelContract">Tiempo</div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormComponentTr"
                                        type="text"
                                        name="duration"
                                        value={input.duration}
                                        min="0"
                                        onChange={onChangeDuration}
                                    />
                                    días
                                </div>
                            </div>

                            {/* <div>
                                <div className="labelForm-buildContract">Categoría</div>
                                <div className="inputForm">
                                    <select className="inputFormCoin" name="category" value={input.category}>
                                        <option value="" name='' onClick={e => { onChangeValue(e, 'category') }} ></option>
                                        <option value="Principiante" name='Principiante' onClick={e => { onChangeValue(e, 'category') }}>Principiante</option>
                                        <option value="Intermedio" name='Intermedio' onClick={e => { onChangeValue(e, 'category') }}>Intermedio</option>
                                        <option value="Avanzado" name='Avanzado' onClick={e => { onChangeValue(e, 'category') }}>Avanzado</option>
                                    </select>
                                </div>
                            </div> */}

                            {/* <div>
                                <div className="labelForm-buildContract">Tipo</div>
                                <div className="inputForm">
                                    <select className="inputFormCoin" name="type" value={input.type}>
                                        <option value="" name='' onClick={e => { onChangeValue(e, 'type') }} ></option>
                                        <option value="Desafio" name='Desafio' onClick={e => { onChangeValue(e, 'type') }}>Desafío</option>
                                        <option value="Solucion" name='Solucion' onClick={e => { onChangeValue(e, 'type') }}>Solución</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>

                        <div className='labelInput'>
                            <div>
                                <div className="labelContract">Recompensa</div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormComponentTr"
                                        type="number"
                                        step="0.00000001"
                                        name="amount"
                                        value={input.amount}
                                        onChange={e => { handleInputChange(e) }}
                                        onBlur={(e) => validate(e.target.name)}
                                    />
                                    ETH
                                </div>
                            </div>
                            {/* <div>
                                <div className="labelForm-buildContract">Moneda</div>
                                <div className="inputForm">
                                    <select className="inputFormCoin" name="coin" value={input.coin}>
                                        <option value="" name='' onClick={e => { onChangeValue(e, 'coin') }} ></option>
                                        <option value="ETH" name='ETH' onClick={e => { onChangeValue(e, 'coin') }}>ETH</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>

                        <div className="labelInput">
                            <div className="labelForm-buildContract">Describe tu problema en pocas palabras</div>
                            {/* <div contenteditable="true" className="inputForm">
                                <textarea
                                disabled
                                    className="inputFormCComponent"
                                    type="text"
                                    name="shortdescription"
                                    //value={input.shortdescription}
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                    onChange={e => { handleInputChange(e) }}
                                    onBlur={e => { handleInputChange(e) }}
                                    rows="2"
                                /></div> */}
                            <div className='input-reach-text'>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    defaultContentState={contentState}
                                    onContentStateChange={setContentState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    toolbar={{
                                        inline: {
                                            options: ['bold', 'italic', 'underline']
                                        },
                                        blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                        fontSize: { className: 'demo-option-custom-medium' },
                                        list: {
                                            options: ['unordered', 'ordered'],
                                        },
                                        textAlign: {
                                            left: { className: 'demo-option-custom' },
                                            center: { className: 'demo-option-custom' },
                                            right: { className: 'demo-option-custom' },
                                            justify: { className: 'demo-option-custom' },
                                        },
                                        fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                        link: {
                                            popupClassName: 'demo-popup-custom',
                                            link: { className: 'demo-option-custom' },
                                            unlink: { className: 'demo-option-custom' },
                                        },
                                        emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        image: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        remove: { className: 'demo-option-custom' },
                                        history: {
                                            undo: { className: 'demo-option-custom' },
                                            redo: { className: 'demo-option-custom' },
                                        },
                                        options: ['blockType', 'fontSize', 'inline', 'list', 'fontFamily', 'link', 'remove', 'history']
                                    }}
                                />
                            </div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm-buildContract">
                                Explica a la comunidad de qué se trata y cómo esperas que lo resuelvan
                            </div>
                            {/* <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="longdescription"
                                    // value={input.longdescription}
                                    value={draftToHtml(convertToRaw(editorStateLong.getCurrentContent()))}
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
                                    toolbar={{
                                        inline: {
                                            options: ['bold', 'italic', 'underline']
                                        },
                                        blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                        fontSize: { className: 'demo-option-custom-medium' },
                                        list: {
                                            options: ['unordered', 'ordered'],
                                        },
                                        textAlign: {
                                            left: { className: 'demo-option-custom' },
                                            center: { className: 'demo-option-custom' },
                                            right: { className: 'demo-option-custom' },
                                            justify: { className: 'demo-option-custom' },
                                        },
                                        fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
                                        link: {
                                            popupClassName: 'demo-popup-custom',
                                            link: { className: 'demo-option-custom' },
                                            unlink: { className: 'demo-option-custom' },
                                        },
                                        emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        image: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
                                        remove: { className: 'demo-option-custom' },
                                        history: {
                                            undo: { className: 'demo-option-custom' },
                                            redo: { className: 'demo-option-custom' },
                                        },
                                        options: ['blockType', 'fontSize', 'inline', 'list', 'fontFamily', 'link', 'remove', 'history']
                                    }}
                                />
                            </div>
                        </div>

                        <div className="labelInput-combo">
                            {/* <div className="labelForm-archivoTest">
                                Sube tu archivo de test.js
                            </div> */}

                            {/* <div className='file-group-contract'>
                                <div class="input__row uploader">
                                    <label for="file-c1"></label>
                                    <input name='file-c1' id="file-c1" class="upload" type="file" onChange={e => { handleInputChange(e) }} />
                                    <div id="inputval" className="input-value">{file1 ? file1 : ''}</div>
                                </div>
                                {input.c1 && input.c1 !== undefined && input.c1 !== 'undefined'
                                    ? <div className='view-file-test'>
                                        <a onClick={() => setShowFile1(!showFile1)}><VisibilityOutlinedIcon /></a>
                                        <a href={input.c1} target='_blank' rel='noopener noreferrer'><DownloadIcon /></a>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div> */}

                            <Modal
                                visible={modalIsOpen}>
                                <div className='modal-overlay'>
                                    <LoadFile />
                                </div>
                            </Modal>

                            {/* <div className='file-group-contract'>
                                <div class="input__row uploader">
                                    <label for="file-c2"></label>
                                    <input name='file-c2' id="file-c2" class="upload" type="file" onChange={e => { handleInputChange(e) }} />
                                    <div id="inputval" className="input-value">{file2 ? file2 : ''}</div>
                                </div>
                                {input.c2 && input.c2 !== undefined && input.c2 !== 'undefined'
                                    ? <div className='view-file-test'>
                                        <a onClick={() => setShowFile2(!showFile2)}><VisibilityOutlinedIcon /></a>
                                        <a href={input.c2} target='_blank' rel='noopener noreferrer'><DownloadIcon /></a>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div> */}

                            {showFile1 || showFile2
                                ? <div className='iframes-test-contract'>
                                    {showFile1
                                        ? <object data={input.c1} type="application/pdf" className='iframes-test-contract-object'>
                                            <iframe id="inlineFrameC1"
                                                title="Test 1"
                                                src={`https://docs.google.com/viewer?url=${input.c1}&embedded=true`}
                                                // style="border:1px solid #666CCC"
                                                frameborder="1"
                                                scrolling="auto"
                                                width="50%"
                                                height="100%"
                                            >
                                            </iframe>
                                        </object>
                                        : <div></div>
                                    }

                                    {showFile2
                                        ?
                                        <object data={input.c2} type="application/pdf" className='iframes-test-contract-object'>
                                            <iframe id="inlineFrameC2"
                                                title="Test 2"
                                                target='_blank'
                                                src={`https://docs.google.com/viewer?url=${input.c2}&embedded=true`}
                                                // style="border:1px solid #666CCC"
                                                frameborder="1"
                                                scrolling="auto"
                                                width="50%"
                                                height="100%"
                                            >
                                            </iframe>
                                        </object>
                                        : <div></div>
                                    }
                                </div>
                                : <div></div>
                            }
                            {/* </div> */}

                        </div>

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
                                    checked={true}
                                    disabled={true}
                                    size='medium'
                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                    color="default"
                                    onChange={() => setChecked(!checked)}
                                />
                            }
                            label="Declaro que los datos ingresados son correctos y que los fondos serán transferidos a quien suba un archivo capaz de resolver los tests adjuntos en este formulario"
                        />

                        <div className='group-button-build'>
                            <button
                                type='submit'
                                className={
                                    input.name === "" ||
                                        input.shortdescription === "" ||
                                        input.longdescription === "" ||
                                        input.amount === "" ||
                                        input.coin === ""
                                        ? "acept-contract acept-contract-disable"
                                        : "acept-contract"
                                }
                                // variant="outlined"
                                onClick={() => saveContract('')}
                                disabled={
                                    input.name === "" ||
                                        input.shortdescription === "" ||
                                        input.longdescription === "" ||
                                        input.amount === "" ||
                                        input.coin === ""
                                        ? true
                                        : false
                                }
                            >Grabar</button>

                            <button
                                type='submit'
                                className='acept-contract'
                                onClick={() => saveContract('published')}
                                hidden={
                                    input.status === "published" ||
                                        input.status === "taken" ||
                                        input.status === 'complete'
                                        ? true
                                        : false
                                }
                            >Publicar</button>

                            <button
                                className="acept-contract"
                                onClick={cancelPublished}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default EditContract;
