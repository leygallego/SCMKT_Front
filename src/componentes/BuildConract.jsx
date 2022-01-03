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
// import { Octokit } from 'octokit'
// const { createOAuthAppAuth, createOAuthDeviceAuth, createOAuthUserAuth } = require('@octokit/auth-oauth-app');
// require('dotenv').config();

// const octokit = new Octokit({
//     // authStrategy: createOAuthAppAuth,
//     // auth: {
//     //   clientType: 'github-app',
//     //   clientId: 'd1caa78b0df97e743827',
//     //   scopes: ['user', 'public_repo', 'repo'],
//     //   onVerification(verification) {
//     //     console.log('Open %s', verification.verification_uri);
//     //     console.log('Enter code: %s', verification.user_code);
//     //   },
//     // },
//     auth: process.env.TOKEN
    
// })



function BuildConract() {
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
        ownerId: user.id
    })

    const [errors, setErrors] = useState({});
    const [modalIsOpen] = useState(false);
    const [Modal, open, close, isOpen] = useModal('root', {
        // preventScroll: true,
        // closeOnOverlayClick: false
    });

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


    const uploadFileC1 = (file) => {
        if (!file) return;
        const storageRef = refStorage(storage, `/documents/${user.id ? user.id : 'zzzzzzzzzzzzzzzz'}/${file.name}`)
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
                    })
            }
        )
    };

    const uploadFileC2 = (file) => {
        if (!file) return;
        const storageRef = refStorage(storage, `/documents/${file.name}`)
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
                    })
            }
        )
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'file-c1') {
            uploadFileC1(e.target.files[0])
            // add fs.readFileSync to
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
            showCancelButton: true,
            confirmButtonText: 'Yes',
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
            console.log('asdf')
            setInput({
                ...input,
                [nameEvent]: e.target.value
            })
        }
    }

    // async function getRepo() {

    //     octokit.request('POST /user/repos', {
    //         name: 'prueba-diff-auth1'
    //     }).then(console.log, console.log);
    // }

    return (
        <>
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
                                    <select className="inputFormCoin" name="type" value={input.type}>
                                        <option value="" name='' onClick={e => { onChangeValue(e, 'type') }} ></option>
                                        <option value="Desafío" name='Desafío' onClick={e => { onChangeValue(e, 'type') }}>Desafío</option>
                                        <option value="Solución" name='Solución' onClick={e => { onChangeValue(e, 'type') }}>Solución</option>
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
                                    <select className="inputFormCoin" name="category" value={input.category}>
                                        <option value="" name='' onClick={e => { onChangeValue(e, 'category') }} ></option>
                                        <option value="Principiante" name='Principiante' onClick={e => { onChangeValue(e, 'category') }}>Principiante</option>
                                        <option value="Intermedio" name='Intermedio' onClick={e => { onChangeValue(e, 'category') }}>Intermedio</option>
                                        <option value="Avanzado" name='Avanzado' onClick={e => { onChangeValue(e, 'category') }}>Avanzado</option>
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
                                    <select className="inputFormCoin" name="coin">
                                        <option value="" name='' onClick={e => { onChangeValue(e, 'coin') }} ></option>
                                        <option value="ETH" name='ETH' onClick={e => { onChangeValue(e, 'coin') }}>ETH</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm-buildContract">Describe tu problema
                            </div>
                            <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="shortdescription"
                                    onChange={e => { handleInputChange(e) }}
                                    rows="2"
                                /></div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm-buildContract">
                                Escribe aquí tu test
                            </div>
                            <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="longdescription"
                                    onChange={e => { handleInputChange(e) }}
                                    rows="5"
                                // maxlength="15000"
                                // onBlur={(e) => validate(e.target.name)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="labelForm-buildContract">
                                Escribe aquí tu Personal-Access-Token:
                            </div>
                                <input type="text" name="Password" value={input.longdescription} />
                            </div>

                        {/*<div className="labelInput-combo">
                            <div className="labelForm-archivoTest">
                                Sube tu archivo de test.js
                            </div>
                            <div className="inputForm-archivo"><input name='file-c1' id='file-c1' className="seleccion-archivo" type="file" onChange={e => { handleInputChange(e) }} /></div>
                            <div className="inputForm-archivo"><input name='file-c2' id='file-c2' className="seleccion-archivo" type="file" onChange={e => { handleInputChange(e) }} /></div>
                        </div>*/}

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
                                onClick={open}
                                disabled={
                                    input.name === "" ||
                                        input.shortdescription === "" ||
                                        input.longdescription === "" ||
                                        input.amount === "" ||
                                        input.coin === "" ||
                                        !checked
                                        ? false
                                        : false
                                }
                            >Previsualizar</button>

                            <button
                                className="acept-contract"
                                onClick={cancelPublished}>Cancelar</button>
                        </div>
                        {/*<div className={isOpen ? '' : ''} visible={isOpen}>
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
                        </div> */}
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default BuildConract;
