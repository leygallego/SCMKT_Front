import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { setChat } from '../actions';
import UserDetail from './UserDetail';
import Messages from './Messages';
import SenderMessage from './SenderMessage';
import ChatDestination from './ChatDestination';


const Chat = () => {

    const chatVisible = useSelector(state => state.chat);
    const [visible, setVisible] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setVisible(chatVisible)
    }, [visible]);

    const closeChat = () => {
        dispatch(setChat());
    }

    return (
        <div>
            {/* Implementaciòn del Chat */}
            {
                chatVisible ?
                    <div className="chatComponent">
                        <div className='chatPannel'>
                            <div className='chaters'>
                                <ChatDestination />
                                <UserDetail />
                            </div>
                            <Button
                                variant="outlined"
                                startIcon={<CloseIcon />}
                                onClick={closeChat}
                            />
                        </div>
                        <div className='chatBody'>
                            <div className='chatLeft'></div>
                            <div className='chatCenter'>
                                <div className="messagesComponent">
                                    <Messages />
                                    <SenderMessage />
                                </div>
                            </div>
                            <div className='chatRight'></div>
                        </div>
                    </div>
                    : <></>
            }
        </div>
    );
}

export default Chat;
