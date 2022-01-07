import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch } from 'react-redux';
import { setChat } from '../actions';

import './styles/contractscard.css';

const ContractsCard = (props) => {
    console.log('PROPS:::::::::::', props.client)
    const { check, onCheck, id, chat } = props
    const dispatch = useDispatch();
    const openChat = () => {
        dispatch(setChat(true));
    }

    return (
        <div className='contractsCardComponent'>
            <div className={check ? 'borradoresContracts' : 'activeContracts'}>
                {chat ?
                    <Button
                        className="chatIcon"
                        variant="error"
                        startIcon={<ChatIcon />}
                        onClick={openChat}
                        size='lg'
                    /> : <></>}
                <div className="info-contrato">
                    <h6 className='datoContrato'>{props.name}</h6>
                    <h6 className='datoContrato'>{props.amount}</h6>
                    <NavLink to={`/detalle/${props.id}`}>
                        { console.log('enviar el dispatch')}
                        <h6 className='datoContrato'>ver detalles</h6>
                    </NavLink>
                </div>
                {check ? <input type="checkbox" name={props.id} onChange={e => { onCheck(e) }} /> : <></>}
            </div>
        </div>
    );
}

export default ContractsCard;
