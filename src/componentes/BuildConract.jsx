import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createContract } from '../actions/index';
import './styles/buildContract.css';
import Swal from 'sweetalert2';

export function BuildConract() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [checked, setChecked] = useState(false);
    const [input, setInput] = useState({
        id: '',
        wallet1: '',
        wallet2: '',
        name: '',
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

        // if (!input.name) errors.name = 'El contrato debe tener un nombre'
        // if (!input.shortdescription) errors.shortdescription = 'Por favor describe el problema que quieres resolver'
        // if (!input.longdescription) errors.longdescription = 'Por favor profundiza en el alcance e impacto del problema que quieres resolver'
        // if (!input.amount || input.amount === "" || isNaN(input.amount)) errors.amount = 'El monto minimo de la recompensa es 0.00000001'
        // if (!input.coin) errors.coin = 'Por favor elige una moneda del listado antes de continuar'
        // if (!input.c1 && !input.c2) errors.condition = 'Por favor sube al menos un archivo antes de continuar'

        console.log('Error', errors)
        console.log('Input', input)
        return errors;
    };

    const handleInputChange = (e) => {
        console.log(e.target.name, e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
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

        let nweC = {
            wallet1: 'user.wallet',
            wallet2: '',
            conditions: {
                name: input.name,
                shortdescription: input.shortdescription,
                longdescription: input.longdescription,
                amount: input.amount,
                coin: input.coin,
                condition: {
                    c1: '',
                    c2: ''
                }
            },
            status: 'unpublished',
            ownerId: "e5e0dfd8-9669-4a71-b81c-053770a6be27" //user.id
        }

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(createContract(nweC))
                setInput({
                    id: '',
                    wallet1: '',
                    wallet2: '',
                    conditions: {
                        name: '',
                        shortdescription: '',
                        longdescription: '',
                        amount: '0.00000001',
                        coin: '',
                        condition: {
                            c1: '',
                            c2: ''
                        }
                    },
                    status: 'unpublished',
                    ownerId: user.id
                })
                window.location.replace(`http://localhost:3000/contract/`)
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
                    <form onSubmit={handleOnSubmit}>
                        <div className="labelInput">
                            <div className="labelForm">Smart contract name </div>
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
                                <div className="labelForm">Reward</div>
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
                                <div className="labelForm">Coin</div>
                                <div className="inputForm">
                                    {/* <input className="inputFormCoin" type="text" name="name" onChange={e => { handleInputChange(e) }} /> */}
                                    <select className="inputFormCoin" name="coin">
                                        <option value="10" name='' onClick={e => { onChangeValue(e, '') }} ></option>
                                        <option value="20" name='ETH' onClick={e => { onChangeValue(e, 'ETH') }}>ETH</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm">Describe tu problema en pocas palabras</div>
                            <div className="inputForm"><input className="inputFormCComponent" type="text" name="shortdescription" onChange={e => { handleInputChange(e) }} /></div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm">
                                Explica a la comunidad de qué se trata y cómo esperas que lo resuelvan
                            </div>
                            <div className="inputForm">
                                <input
                                    className="inputFormCComponent"
                                    type="text"
                                    name="longdescription"
                                    onChange={e => { handleInputChange(e) }}
                                    onBlur={(e) => validate(e.target.name)}
                                />
                            </div>
                        </div>

                        <div className="labelInput-combo">
                            <div className="labelForm-archivoTest">
                                Sube tu archivo de test.js
                            </div>
                            <div className="inputForm-archivo"><input className="seleccion-archivo" type="file" /></div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm">
                                Confirma tu contraseña
                            </div>
                            <div className="inputForm"><input className="inputFormCComponent" type="password" name="password" onChange={e => { handleInputChange(e) }} /></div>
                        </div>

                        <div className="labelInput">
                            <div className="labelForm">
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
                        </div>

                        <Button
                            type='submit'
                            className="acept-contract"
                            variant="contained"
                            onClick={handleOnSubmit}
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
                        >Add Contract</Button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default BuildConract;