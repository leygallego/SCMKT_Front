import React from 'react';
import { NavLink } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';




import './styles/buildContract.css'

export default function BuildConratc() {

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    const handleOnChange = (e) => {

    }

    // const visualizar = () => {
    // }

    return (
        <>
        <div className="contractComponent">
            <div className="contractForm">
                <form action={(e) => { handleOnSubmit(e) }}>
                    <div className="labelInput">
                        <div className="labelForm">Smart contract name </div>
                        <div className="inputForm"><input className="inputFormCComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>



                    <div className='combo'>
                        <div>
                            <div className="labelForm">Reward</div>
                            <div className="inputForm"><input className="inputFormReward" type="number" step="0.00000001" name="name" onChange={e => { handleOnChange(e) }} /></div>
                        </div>
                        <div>
                            <div className="labelForm">Coin</div>
                            <div className="inputForm">
                                {/* <input className="inputFormCoin" type="text" name="name" onChange={e => { handleOnChange(e) }} /> */}
                                <select className="inputFormCoin">
                                    <option value="10"></option>
                                    <option value="20">ETH</option>
                                </select>
                            </div>
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
                        <div className="inputForm">
                            <Checkbox
                                value="checkedA"
                                size='medium'
                                inputProps={{ 'aria-label': 'Checkbox A' }}
                                color="default"
                            />
                        </div>
                    </div>
                    <NavLink to="/detalleview">
                        <div className="buttonFormComponent"><input className="buttonComponent" type="button" value="Visualizar" /></div>

                    </NavLink>


                </form>
            </div>

        </div>
        <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>                    <div className="logos-footer">
                <NavLink to={{pathname:"https://www.facebook.com/"}}><img src="/images/facebook.png" alt="facebook logo" /></NavLink>
                        <NavLink to={{pathname:"https://www.instagram.com/"}}>
                        <img src="/images/instagram.png" alt="instagram logo" />
                        </NavLink>
                        
                        <NavLink to={{pathname:"https://www.linkedin.com/"}}>
                        <img src="/images/linkedin.png" alt="linkedin logo" />
                        </NavLink>


                    </div>
                    
                </div>
                <div className="home-derecha">
                    <ul>
                        <li>
                            <NavLink to="/home">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contratos">Contratos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutus">Quiénes Somos</NavLink>
                        </li>

                        <li>
                            <NavLink to="/registro">Regístrate</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}
