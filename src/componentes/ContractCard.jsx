import React from 'react';
import './styles/Contratos.css';
import { NavLink } from 'react-router-dom';


function ContractCard({ id, conditions }) {

    let { name, amount, shortdescription } = conditions

    return (
        <>
            <div className="contratos-card">
                <div className='wrapper'>
                    <NavLink to={`/detalle/${id ? id : "undefined"}`}>
                        <div className='ellipsis-contract-name'>{name ? name : "undefined"}</div>
                    </NavLink>
                    <span className='contractAmount'>{amount ? amount : "undefined"}</span>
                    <p className='contractShortDescription'>{shortdescription ? shortdescription : "undefined"}</p>
                </div>
            </div>
        </>
    )
}

export default ContractCard