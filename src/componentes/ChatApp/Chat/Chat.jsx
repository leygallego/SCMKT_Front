import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { sendLogin } from '../../../actions';


import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';


const ENDPOINT = "http://localhost:5000/";

let socket;


function Chat () {
    const user = useSelector(state => state.user);
    const [name, setName] = useState(user.name)
    const [room, setRoom] = useState('prueba');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    //const [userHook, setUserHook] = useState();
    //const dispatch = useDispatch();
    //const { getAccessTokenSilently } = useAuth0();

    /*async function callProtectedApi() {
        try {
            dispatch(sendLogin(window.sessionStorage.getItem('token')))

        } catch(error) {
            console.log('Error en el perfil ', error)
        }
        
    }*/





    /*const {user} = useSelector(state => state)
    useEffect(() => {
        dispatch(callProtectedApi)
        setUserHook(user);
        
    }, [dispatch])
*/
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
      }, [ENDPOINT]);

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
          console.log(message);
        }
      }

      /*console.log(messages);
      console.log(name);
      console.log(room);
      console.log(users);
*/
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