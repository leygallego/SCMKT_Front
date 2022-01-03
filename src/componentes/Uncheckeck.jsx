import React from 'react';
import { NavLink } from 'react-router-dom';


import './Profile.css';


const Uncheckeck = (props) => {
    return (
        <div>
            <div className='borradoresContracts'>
                <div key={props.id} className="info-contrato">
                    <h6>{props.name}</h6>
                    <h6>{props.amount}</h6>
                    <NavLink to="/detallecontratosfin"><h6>ver detalles</h6></NavLink>
                </div>
                <input type="checkbox" name={props.id}  />
            </div>
        </div>
    );
}

export default Uncheckeck;
