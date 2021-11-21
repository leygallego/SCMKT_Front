import React from 'react';
import { NavLink } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
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

            <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>
                    <div className="logos-footer">
                        <NavLink to={{pathname:"https://www.facebook.com/"}}><img src="/images/facebook.png" alt="facebook logo" /></NavLink>
                        <NavLink to={{pathname:"https://www.instagram.com/"}}>
                        <img src="/images/instagram.png" alt="instagram logo" />
                        </NavLink>
                        
                        <NavLink to={{pathname:"https://www.linkedin.com/"}}>
                        <img src="/images/linkedin.png" alt="linkedin logo" />
                        </NavLink>
                        


                    </div>
                    
                </div>
                <div className="home-derecha">
                    <ul>
                        <li>
                            <NavLink to="/home">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contratos">Contratos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutus">Quiénes Somos</NavLink>
                        </li>

                        <li>
                            <NavLink to="/registro">Regístrate</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default AboutUs
