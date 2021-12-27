import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../actions';

export default function SenderMessage() {

    const dispatch = useDispatch();
    const [message, setMessage] = useState();
    const channelChatId = useSelector(state => state.channel);
    const logged = useSelector(state => state.user);

    const handleOnChange = (e) => {
        setMessage(e.target.value)
    }

    const handleOnClick = () => {
        if (message) dispatch(sendMessage({
            channelId: channelChatId,
            message,
            from: logged.id,
        }));
        setMessage('');
    }

    const handleKeyPress = e => {
        if (e.keyCode === 13) {
            handleOnClick();
        }
    };

    return (
        <div className="senderComponent">
            <input className='inputSender' type="text" value={message} onChange={e => { handleOnChange(e) }} onKeyDown={e => { handleKeyPress(e) }} defaultValue={message} />
            <input className='inputSenderButton' type="button" value="Enviar" onClick={handleOnClick} />
        </div>
    )
}