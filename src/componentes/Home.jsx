import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setChat, configChannel, eraseMessage } from '../actions';


function Home() {

    const dispatch = useDispatch();

    dispatch(setChat(false));
    // dispatch(configChannel(""));
    dispatch(eraseMessage([]));


    return (
        <>
            <div className="main">
                <div className="area-texto">
                    <div className="texto-home">
                        <h1>Soluciona tus necesidades de codigo más rapido que nunca</h1>
                    </div>
                    <div className="texto-secundario">
                        <p>Pon recompensas por tus problemas más dificiles y ve como la comunidad lo resuelve</p>
                    </div>
                    <div className="button-container">
                        <NavLink to="/contratos"><Button
                            className="busca-contratos"
                            variant="contained"
                            startIcon={<SearchIcon />}
                        >Buscar Contratos</Button></NavLink>
                    </div>
                    <div className="contenedor-secundario">
                        <div className="wrap-downpage">
                            <div className="texto-motivador">
                                <p>Mi abuelo siempre me decía: "Hazlo lento que voy apurado". Codear primero los tests puede parecer más lento pero los beneficios son increíbles.</p> <br />
                                <p>Desde evitar romper hasta la detección de bugs que habíamos olvidado, automatizar los tests nos ayuda a construír sin miedo y de forma robusta</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wraper-images">
                    <div className="imagen-home">
                        <img src="/images/assetHome2.png" alt="imagen para home" />
                        <div className="imagen-azul">
                        <div className="videoComponent">
                        <iframe
                        width="600"
                        height="1200" 
                        src="https://firebasestorage.googleapis.com/v0/b/henryfrontimages.appspot.com/o/documents%2FHenry%20_%20Invertimos%20en%20tu%20educaci%C3%B3n.mp4?alt=media&token=8cfd7cf9-2843-47ea-8cb3-3c6bd2f70fb3"></iframe>
                        </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <div className="divisor-home"></div>
        </>
    )
}

export default Home
