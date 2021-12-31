import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from "@auth0/auth0-react";
import UserAvatar from './UserAvatar';
import Loader from './Loader';
// import axios from 'axios';
// import { useDispatch} from 'react-redux';
// import { sendLogin } from '../actions';

function NavBar() {
  // const [showLinks, setShowLinks] = useState(false);

  const {
    loginWithRedirect,
    logout,
    //user,
    isAuthenticated,
    //getAccessTokenSilently,
  } = useAuth0();

  const loading = useSelector((state) => state.loading);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked)
  }

  const login = () => {

  }


  return (
    <nav>

      <div className="logo-smartcontracts">

        <NavLink to="/"><span>SmartContracts</span> </NavLink>

      </div>
      <div className="menu-icon" onClick={handleClick}>
        {clicked ? <CloseIcon /> : <ReorderIcon />}
      </div>

        {
                isAuthenticated ?
                  (
                    // <ul className={clicked ? "menu-list" : "menu-list close"}>
                    <ul className={clicked ? "menu-list" : "menu-list close"}>
                    <li>
                      <NavLink onClick={handleClick} className={({ active }) => (active ? "active" : "noActive")} to="/contratos">Contratos</NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleClick} className={({ active }) => (active ? "active" : "noActive")} to="/aboutus">Quienes Somos</NavLink>
                    </li>

                        
                         <li onClick={handleClick} ><NavLink className={({ active }) => (active ? "active" : "noActive")} to="/perfil">Perfil</NavLink></li> 
                        

                        <div onClick={handleClick} className="logout-button">
                        
                          <button className="logout-button" onClick={logout}> <span>Cerrar Sesión</span> </button>
                        
                        </div>
                        <li className="profile-image">
                          <UserAvatar/>
                        </li>

                      
                    </ul>
                  )
                  : (

                    <ul className={clicked ? "menu-list" : "menu-list close"}>
                    <li onClick={handleClick} >
                      <NavLink className={({ active }) => (active ? "active" : "noActive")} to="/contratos">Contratos</NavLink>
                    </li>
                    <li onClick={handleClick}>
                      <NavLink className={({ active }) => (active ? "active" : "noActive")} to="/aboutus">Quienes Somos</NavLink>
                    </li>
                    <div onClick={handleClick} className="login-button">
                      
                          <Button variant='contained' onClick={loginWithRedirect} >Iniciar Sesión</Button>
                        
                    </div>

                    </ul>
                  )
              }
      
      {
        isAuthenticated ?
          (
            // <ul className={clicked ? "menu-list" : "menu-list close"}>
            <ul className={clicked ? "menu-list" : "menu-list close"}>
              <li>
                <NavLink onClick={handleClick} className={({ isActive }) => (isActive ? "active" : "noActive")} to="/contratos">Contratos</NavLink>
              </li>
              <li>
                <NavLink onClick={handleClick} className={({ isActive }) => (isActive ? "active" : "noActive")} to="/aboutus">Quienes Somos</NavLink>
              </li>


              <li onClick={handleClick} ><NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/perfil">Perfil</NavLink></li>


              <div onClick={handleClick} className="logout-button">

                <button className="logout-button" onClick={logout}> <span>Cerrar Sesión</span> </button>

              </div>
              <li className="profile-image">
                <UserAvatar />
              </li>


            </ul>
          )
          : (

            <ul className={clicked ? "menu-list" : "menu-list close"}>
              <li onClick={handleClick} >
                <NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/contratos">Contratos</NavLink>
              </li>
              <li onClick={handleClick}>
                <NavLink className={({ isActive }) => (isActive ? "active" : "noActive")} to="/aboutus">Quienes Somos</NavLink>
              </li>
              <div onClick={handleClick} className="login-button">

                <Button variant='contained' onClick={loginWithRedirect} >Iniciar Sesión</Button>

              </div>

            </ul>
          )
      }


    </nav>
  )
}

export default NavBar
