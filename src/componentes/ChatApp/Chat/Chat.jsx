import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { sendLogin } from '../../../actions';


import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';


const ENDPOINT = 'https://localhost:3000/';

let socket;


function Chat () {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('prueba');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    const [userHook, setUserHook] = useState();
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            dispatch(sendLogin(token))

        } catch(error) {
            console.log('Error en el perfil ', error)
        }
        
    }





    const {user} = useSelector(state => state)
    useEffect(() => {
        dispatch(callProtectedApi)
        setUserHook(user);
        
    }, [dispatch])

    useEffect(() => {
        let name = user.name;
        let room = 'prueba';
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name)
    
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ENDPOINT, user.name]);

      useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);
    
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    return (
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
          <TextContainer users={users}/>
        </div>
      );


}

export default Chat;