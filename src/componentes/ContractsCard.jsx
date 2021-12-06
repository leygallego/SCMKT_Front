import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles/contractscard.css';

const ContractsCard = (props) => {
    return (
        <div className='contractsCardComponent'>
            <div key={props.index} className="info-contrato">
                <h6>{props.name}</h6>
                <h6>{props.amount}</h6>
                <NavLink to={`/detalle/${props.id}`}>
                    <h6>ver detalles</h6>
                </NavLink>
            </div>
        </div>
    );
}

export default ContractsCard;
