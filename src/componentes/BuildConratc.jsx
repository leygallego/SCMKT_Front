import React from 'react';

import './styles/buildContract.css'

export default function BuildConratc() {

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    const handleOnChange = (e) => {

    }

    return (
        <div className="contractComponent">
            <div className="contractForm">
                <form action={(e) => { handleOnSubmit(e) }}>
                    <div className="labelInput">
                        <div className="labelForm">Nombre del contrato </div>
                        <div className="inputForm"><input className="inputFormCComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="combo">
                    <div className="labelInput">
                        <div className="labelForm">Recompensa</div>
                        <div className="inputForm"><input className="inputFormCComponentCombo" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">Moneda</div>
                        <div className="inputForm"><input className="inputFormCComponentCombo" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">Describe tu problema en pocas palabras</div>
                        <div className="inputForm"><input className="inputFormCComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">
                            Explica a la comunidad de qué se trata y cómo esperas que lo resuelvan 
                            </div>
                        <div className="inputForm"><input className="inputFormCComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="labelInput combo">
                        <div className="labelForm">
                            Sube tu archivo de test.js
                        </div>
                        <div className="inputForm"><input className="" type="file" /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">
                            Confirma tu contraseña 
                            </div>
                        <div className="inputForm"><input className="inputFormCComponent" type="password" name="password" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">
                            Declaro que los datos ingresados son correctos y que los fondos serán transferidos a quien suba un archivo capaz de resolver los tests adjuntos en este formulario 
                            </div>
                        <div className="inputForm"><input className="inputFormCComponent" type="text" name="checkbox" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="buttonFormComponent"><input className="buttonComponent" type="button" value="Visualizar" /></div>

                </form>
            </div>

        </div>
    )
}
