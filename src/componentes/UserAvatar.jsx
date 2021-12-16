import React from 'react';
import { useSelector } from 'react-redux';


export default function UserAvatar() {

    const user = useSelector(state => state.user)

    return (
        <div>
            <div className="userDataComponent">
                <div className="caja">
                    <div className="box">
                    <img src={user.image} alt="usuario" />
                    </div>
                </div>
            </div>
        </div>
    )
}
