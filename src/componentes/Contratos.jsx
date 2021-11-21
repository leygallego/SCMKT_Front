import React, { useEffect } from 'react';
import './Contratos.css';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { getContracts } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import ContractCard from './ContractCard';
import { useAuth0 } from '@auth0/auth0-react'



function Contratos() {
    let dispatch = useDispatch()
    const { contracts } = useSelector(state => state)
    const { isAuthenticated } = useAuth0()
    
    console.log(contracts)

    useEffect(() => {
        dispatch(getContracts())
    }, [dispatch])

    return (
        <>
        <div>
        <h1>Componente Contratos</h1>
        {
            isAuthenticated?
            (
                <div>
                    <NavLink to="/creacontrato"><Button variant="contained">Crear Contrato</Button></NavLink>
                </div>
            )
            :(
                <div>
                    <NavLink to="/login"><Button variant="contained">Crear Contrato</Button></NavLink>
                </div>
            )

        }
        
        </div>
        <div className="main-contratos">
        {
            contracts.length > 0 && contracts.map((c)=>{
                return <ContractCard id={c.id} conditions={c.conditions}/>
            })
            
        }
        </div>
        <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>
                    <div className="logos-footer">
                        
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

export default Contratos
