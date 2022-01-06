import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setChat, eraseMessage } from '../actions';
import Slogan from './Slogan';
import TextoIndicador from './TextoInidcador';
import SearchContractsButton from './SearchContractsButton';
import Reflexions from './Reflexions';
import Principalimage from './PrincipalImage';
import Video from './Video';
import './styles/Home.css';


function Home() {

    const dispatch = useDispatch();

    dispatch(setChat(false));
    dispatch(eraseMessage([]));

    return (
        <>   
            <div className="main">
                <div className='wrapperImages'>
                    <Principalimage />
                </div>
                <div className="wrapperTexts">
                    <Slogan />
                    <TextoIndicador />
                    {/* <SearchContractsButton /> */}
                    <Reflexions />
                </div>
                <div className='wrapperVideo'>
                    <Video />
                </div>
            </div>
            <div className="divisorHome">
            </div>
        </>
    )
}

export default Home
