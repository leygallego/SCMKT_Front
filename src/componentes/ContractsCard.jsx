import React from 'react';
import { NavLink } from 'react-router-dom';


import './styles/contractscard.css';

const ContractsCard = (props) => {
    const { check, onCheck } = props

    return (
        <div className='contractsCardComponent'>
            <div className={check ? 'borradoresContracts' : 'activeContracts'}>
                <div className="info-contrato">
                    <div className='datoContrato datoContratoName'>{props.name}  </div>
                    <div className='datoContrato datoContratoAmount'>{props.amount}</div>
                    <NavLink to={`/detalle/${props.id}`}>
                    <div className='datoContrato datoContratoLink'>detalles</div>
                    </NavLink>
                </div>
                {check ? <input type="checkbox" name={props.id} onChange={e => { onCheck(e) }} /> : <></>}
            </div>
        </div>
    );
}

export default ContractsCard;
