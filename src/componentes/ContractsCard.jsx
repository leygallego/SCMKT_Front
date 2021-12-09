import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles/contractscard.css';

const ContractsCard = (props) => {
    const { check, onCheck, key, id } = props

    return (
        <div className='contractsCardComponent'>
            <div className={check? 'borradoresContracts' : ''}>
                <div key={props.key} className="info-contrato">
                    <h6>{props.name}</h6>
                    <h6>{props.amount}</h6>
                    <NavLink to={`/detalle/${props.id}`}>
                        <h6>ver detalles</h6>
                    </NavLink>
                </div>
                {check ? <input type="checkbox" name={props.id} onChange={e => { onCheck(e) }} /> : <></>}
            </div>
        </div>
    );
}

export default ContractsCard;
