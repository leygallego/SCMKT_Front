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
    const { isAuthenticated, /*loginWithRedirect*/ loginWithPopup } = useAuth0()

    
    
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
                    <Button variant="contained" onClick={loginWithPopup}>Crear Contrato</Button>
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
        </>
    )
}

export default Contratos
