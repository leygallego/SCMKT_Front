import React from 'react';
import Loader from "react-loader-spinner";

import './styles/spinner.css'

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export default function Spinner() {
    return (
        <div className="spn">
            <Loader
                type="Puff"
                color="#00BFFF"
                height={50}
                width={50}
                timeout={4000} //3 secs
            />
        </div>
    )
}

