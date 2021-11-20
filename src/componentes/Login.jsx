//import React, { useEffect, useState } from 'react';
//import { Avatar } from '@material-ui/core';
//import { useSelector } from 'react-redux';
// import { sendLogin } from '../actions';
// import { NavLink, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export default function Login() {
/*     // const baseUrl = './perfil';

    const usuario = useSelector(state => state.user);
    console.log(usuario)

    useEffect(() => {
        
    })
    // const dispatch = useDispatch();

    const [login, setLogin] = useState({
        name: "",
        password: ""
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.clear();
        if (login.name === "" || login.password === "") {
            console.log('Formulario incompleto...')
        } else {
            // dispatch(sendLogin(login));
            // <Redirect to="/perfil" />
            window.location.href = baseUrl
        }
    }

    const handleOnChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
        <div className="loginComponent">
            <div className="avatarContainer">

                <Avatar
                    alt="Remy Sharp"
                    src={'images/user.png'}
                    className="avatar"
                    style={{ width: 124, height: 124 }}
                />
            </div>
            <div><p>Login to start viewing the</p><p>available contracts</p></div>

            <form onSubmit={e => { handleOnSubmit(e) }}>
                <div>
                    <div className="labelInput">
                        <div className="labelForm">User name </div>
                        <div className="inputForm"><input className="inputFormComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">Password</div>
                        <div className="inputForm"><input className="inputFormComponent" type="password" name="password" onChange={e => { handleOnChange(e) }} /></div>
                    </div>
                    <div className="buttonFormComponent"><input className="buttonComponent" type="submit" value="Send" /></div>
                </div>
            </form>
        </div>

        
        </>
    ) */
    const { 
        loginWithRedirect,
        logout, 
        user, 
        isAuthenticated, 
        getAccessTokenSilently,
    } = useAuth0();

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        const response = await axios.get('http://localhost:3001/user/login', {
            headers: {
                Authorization: `Bearer ${token}`
        }});
        console.log(response);

    }

    return (
        <>
            <div className="loginComponent">
                <h1>Prueba de Auth0 </h1>
                <ul>
                    <li>
                        <button onClick={loginWithRedirect}>Login</button>
                    </li>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                </ul>
                <h3>User is {isAuthenticated? "Logged in" : "Not logged"}</h3>

                <ul>
                    <li><button onClick={callProtectedApi}>Call protected API</button></li>
                    <li><button>Call API</button></li>
                </ul>

                {isAuthenticated && (
                <pre style={{ textAlign: "start"}}>
                    {JSON.stringify(user, null, 2)}
                </pre>
                )}
            </div>
        </>
    );


}
