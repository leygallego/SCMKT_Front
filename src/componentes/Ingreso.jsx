import { Switch } from '@mui/material'
import React, { useState } from 'react'
import Login from './Login';
import Registro from './Registro';

import './styles/ingreso.css';

export default function Ingreso() {

    const [sw, setSw] = useState(true);

    const handleSwitchOnChange = () => {
        setSw(!sw)
    }

    /*
    
            <div>
                Login
                <Switch
                    onChange={handleSwitchOnChange}
                    color="primary"
                />
                Sing up
            </div>
             <div>
                 {sw ? 
                 <Login /> 
                 : 
                 <Registro />
                 } 
            </div>

    */


    return (
        <div className="ingresoComponent">
           <Registro />
        </div>
    )
}
