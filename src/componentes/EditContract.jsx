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
// import { useModal } from 'react-hooks-use-modal';
// import DetalleContratoPreview from './DetalleContratoPreview';
import Swal from 'sweetalert2';

export function EditContract() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const contract = useSelector(state => state.contract)
    const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`

    const [checked, setChecked] = useState(false);
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [input, setInput] = useState({
        id: contract.id,
        wallet1: contract.wallet1,
        wallet2: contract.wallet2,
        author: contract.author,
        name: contract.conditions.name,
        shortdescription: contract.conditions.shortdescription,
        longdescription: contract.conditions.longdescription,
        amount: contract.conditions.amount,
        coin: contract.conditions.coin,
        c1: contract.conditions.condition.c1 && contract.conditions.condition.c1 != undefined? contract.conditions.condition.c1 : null,
        c2: contract.conditions.condition.c2 && contract.conditions.condition.c2 != undefined? contract.conditions.condition.c2 : null,
        status: contract.status,
        clientId: contract.clientId
    })

    const [errors, setErrors] = useState({});
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [Modal, open, close, isOpen] = useModal('root', {
    // });

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
        const storageRef = refStorage(storage, `/documents/${id}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log('archivo URL', url)
                        setInput({
                            ...input,
                            c1: url
                        })
                        setFile1(file.name)
                    })
            }
        )
    };

    const uploadFileC2 = (file) => {
        if (!file) return;
        const storageRef = refStorage(storage, `/documents/${id}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log('archivo URL', url)
                        setInput({
                            ...input,
                            c2: url
                        })
                        setFile2(file.name)
                    })
            }
        )
    };

    const onloadFile = (el, name) => {
        console.log('my name is', el.target)
        if (name === 'c1') {

        }
    }

    const handleInputChange = (e) => {
        console.log('adfasdf', e.target.files[0])
        if (e.target.name === 'file-c1') {
            // setArchivo1(e.target.files[0]);
            uploadFileC1(e.target.files[0])
        } else if (e.target.name === 'file-c2') {
            uploadFileC2(e.target.files[0])
        } else {
            console.log(e.target.name, e.target.value)
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
            coin: e.target.value
        })
        setErrors(validate({
            ...input,
            coin: e.target.value
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
                window.location.replace(`${urlWork}/contratos/`)
            }
        })
    }

    const saveContract = () => {
        let nweC = {
            id: input.id,
            wallet1: input.wallet,
            wallet2: input.wallet2,
            author: input.author,
            conditions: {
                name: input.name,
                shortdescription: input.shortdescription,
                longdescription: input.longdescription,
                amount: input.amount,
                coin: input.coin,
                condition: {
                    c1: input.c1,
                    c2: input.c2
                }
            },
            status: input.status,
            clientId: input.clientId,
            ownerId: user.id
        }

        console.log('formateo datos de contrato', nweC, nweC.conditions, nweC.conditions.condition)

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(updateContract(nweC))

                Swal.fire('Saved!', '', 'success')
                    .then((result) => {
                        //window.location.replace("https://scmkt-4fe6b.web.app/perfil/")
                        // window.location.replace(`http://localhost:3000/perfil`)
                        window.location.replace(`${urlWork}/perfil/`)

                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
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
                            <div className="inputForm">
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

                        <div className='combo'>
                            <div>
                                <div className="labelForm-buildContract">Recompensa</div>
                                <div className="inputForm">
                                    <input
                                        className="inputFormReward"
                                        type="number"
                                        step="0.00000001"
                                        name="amount"
                                        value={input.amount}
                                        onChange={e => { handleInputChange(e) }}
                                        onBlur={(e) => validate(e.target.name)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="labelForm-buildContract">Moneda</div>
                                <div className="inputForm">
                                    {/* <input className="inputFormCoin" type="text" name="name" onChange={e => { handleInputChange(e) }} /> */}
                                    <select className="inputFormCoin" name="coin" value={input.coin}>
                                        <option value="" name='' onClick={e => { onChangeValue(e, '') }} ></option>
                                        <option value="ETH" name='ETH' onClick={e => { onChangeValue(e, 'ETH') }}>ETH</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm-buildContract">Describe tu problema en pocas palabras</div>
                            <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="shortdescription"
                                    value={input.shortdescription}
                                    onChange={e => { handleInputChange(e) }}
                                    rows="2"
                                /></div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm-buildContract">
                                Explica a la comunidad de qué se trata y cómo esperas que lo resuelvan
                            </div>
                            <div className="inputForm">
                                <textarea
                                    className="inputFormCComponent"
                                    type="text"
                                    name="longdescription"
                                    value={input.longdescription}
                                    onChange={e => { handleInputChange(e) }}
                                    rows="5"
                                // maxlength="15000"
                                // onBlur={(e) => validate(e.target.name)}
                                />
                            </div>
                        </div>

                        <div className="labelInput-combo">
                            <div className="labelForm-archivoTest">
                                Sube tu archivo de test.js
                            </div>
                            <div className="inputForm-archivo-edit-contract">
                                <div className='file-group-contract'>
                                    <div class="input__row uploader">
                                        <label for="file-c1"></label>
                                        <input name='file-c1' id="file-c1" class="upload" type="file" onChange={e => { handleInputChange(e) }} />
                                        <div id="inputval" className="input-value">{file1 ? file1 : ''}</div>
                                    </div>
                                    {input.c1 && input.c1 != undefined && input.c1 != 'undefined'
                                        ? <div className=''>
                                            <a href={input.c1} target='_blank' rel='noopener noreferrer'><VisibilityOutlinedIcon /></a>
                                            <a href={input.c1} target='_blank' rel='noopener noreferrer'><DownloadIcon /></a>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>

                                <div className='ver_que_estilo_poner'>
                                    <div class="input__row uploader">
                                        <label for="file-c2"></label>
                                        <input name='file-c2' id="file-c2" class="upload" type="file" onChange={e => { handleInputChange(e) }} />
                                        <div id="inputval" className="input-value">{file2 ? file2 : ''}</div>
                                    </div>
                                    {input.c2 && input.c2 != undefined && input.c2 != 'undefined'
                                        ? <div className='view-file-test'>
                                            <a href={input.c2} target='_blank' rel='noopener noreferrer'><VisibilityOutlinedIcon /></a>
                                            <a href={input.c2} target='_blank' rel='noopener noreferrer'><DownloadIcon /></a>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>
                            </div>

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
                                        input.coin === "" ||
                                        !checked
                                        ? "acept-contract acept-contract-disable"
                                        : "acept-contract"
                                }
                                // variant="outlined"
                                onClick={saveContract}
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
                            >Grabar</button>

                            <button
                                className="acept-contract"
                                onClick={cancelPublished}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditContract;
