import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { sendLogin } from '../actions';



function Chat () {
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



}

export default Chat;