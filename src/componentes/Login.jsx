import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';

export default function Login() {

    const [login, setLogin] = useState({
        name: "",
        password: ""
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (login.name === "" || login.password === "") {
            console.log('Formulario incompleto...')
        }
        console.log(login);
        // setLogin({
        //     name: "",
        //     password: ""
        // });

        // dispatch(postLogin(Login));
    }

    const handleOnChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    return (
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
                        <div className="labelForm">Full name </div>
                        <div className="inputForm"><input className="inputFormComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} defaultValue={login.name} /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">Password</div>
                        <div className="inputForm"><input className="inputFormComponent" type="password" name="password" onChange={e => { handleOnChange(e) }} defaultValue={login.email} /></div>
                    </div>
                    <div className="buttonFormComponent"><input className="buttonComponent" type="submit" value="Send" /></div>
                </div>
            </form>
        </div>
    )
}
