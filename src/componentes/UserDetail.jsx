import React from 'react';
import { useSelector } from 'react-redux';


export default function UserDetail() {

    const user = useSelector(state => state.user)

    return (
        <div>
            <div className="userDataComponent">
                <div className="caja">
                    <div className="box">
                    <img src={user.image} alt="usuario" />
                    </div>
                </div>
                <h5>{user.name}</h5>

            </div>
        </div>
    )
}
