import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
// import { sendLogin } from '../actions';
// import { NavLink, Redirect } from 'react-router-dom';

export default function Login() {
    const baseUrl = './perfil';

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
    )
}
