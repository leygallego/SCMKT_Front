import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../actions';

export default function SenderMessage() {

    const dispatch = useDispatch();
    const [message, setMessage] = useState();
    // const logged = useSelector(state => state.loggedUser);
    const logged = useSelector(state => state.user);

    const receiver = useSelector(state => state.choosed.id);
    console.log(receiver)
    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }
    const handleOnClick = () => {
        if (message) dispatch(sendMessage({
            message,
            from: logged.id,
            to: receiver
        }));
        setMessage('');
    }

    const handleKeyPress = e => {
        if (e.keyCode === 13) {
            handleOnClick();
        }
    };


    return (
        <dir className="senderComponent">
            <input className='inputSender' type="text" value={message} onChange={e => { handleOnChange(e) }} onKeyDown={e => { handleKeyPress(e) }} defaultValue={message} />
            <div>
                <input className='inputSenderButton' type="button" value="Enviar" onClick={handleOnClick} />
            </div>
        </dir>
    )
}