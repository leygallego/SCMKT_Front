import React from 'react';
import './AboutUs.css';
import { useDispatch } from 'react-redux';
import { setChat, configChannel, eraseMessage } from '../actions';

function AboutUs() {

    const dispatch = useDispatch();

    dispatch(setChat(false));
    // dispatch(configChannel(""));
    dispatch(eraseMessage([]));



    return (
        <>
            <div className="about-container">
                <div className="decorative-about">
                    <img src="./images/decorative.png" alt="imagen decorativa" />
                </div>
                <div className="texto-about">
                    <h1>Somos (scmkt)</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat deleniti libero suscipit adipisci, corporis sapiente ab voluptas et! Neque rerum officiis quisquam obcaecati. Corporis eaque vel deserunt velit, mollitia non? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum sunt iusto nobis facilis molestias sint repellat itaque dolore id laudantium aliquam corporis</p>
                </div>
                
            </div>
        </>
    )
}

export default AboutUs
