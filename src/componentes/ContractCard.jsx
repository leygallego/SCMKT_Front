import React from 'react';
import './Contratos.css';
import { NavLink } from 'react-router-dom';



function ContractCard({ id, conditions }) {
    let {name, amount, shortdescription} = conditions

    return (
        <>
            <div className="contratos-card">
                <NavLink to={`/detalle/${id?id:"undefined"}`}><h2>{name?name:"undefined"}</h2></NavLink>                
                <h1><span>{amount?amount:"undefined"}</span> </h1>
                    <p>{shortdescription?shortdescription:"undefined"}</p>
            </div>
        </>
    )
}

export default ContractCard