import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../componentes/styles/NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from "@auth0/auth0-react";
import UserAvatar from './UserAvatar';

function NavBar() {

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
  } = useAuth0();

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }

  }, [])


  return (
    <nav>
      {isAuthenticated ? (
        <>
          {(toggleMenu || screenWidth > 500) && (
            <ul className="list">
              <li className="items" onClick={toggleNav}>
                <NavLink className="navLink" to="/contratos">Contratos</NavLink>
              </li>
              <li className="items" onClick={toggleNav}>
                <NavLink className="navLink" to="/aboutus">Quienes Somos</NavLink>
              </li>
              <li className="items" onClick={toggleNav}>
                <NavLink className="navLink" to="/questions">FAQs</NavLink>
              </li>
              <li className="items" onClick={toggleNav}>
                <NavLink className="navLink" to="/perfil">Perfil</NavLink>
              </li>
              <li className="items"  onClick={() => {
                toggleNav();
                logout();
              }
              }>Cerrar Sesión
              </li>
            </ul>
          )}

          <button onClick={toggleNav} className="btn">BTN</button>
          <h1 className='title'><NavLink className="navLink" to="/">SmartContracts</NavLink></h1>
          {/* <h1 className='title'>SmartContracts</h1> */}
        </>
      ) : (
        <>
          {(toggleMenu || screenWidth > 500) && (
            <ul className="list">
              <li className="items" onClick={toggleNav}>Contratos</li>
              <li className="items" onClick={toggleNav}>Quienes Somos</li>
              <li className="items" onClick={toggleNav}>FAQs</li>
              <li className="items" onClick={toggleNav}>Perfil</li>
              <li className="items" onClick={() => {
                toggleNav();
                loginWithRedirect();
              }
              }>Iniciar Sesión
                {/* <Button variant='contained' onClick={loginWithRedirect} >Iniciar Sesión</Button> */}
              </li>
            </ul>
          )}

          <button onClick={toggleNav} className="btn">BTN</button>
          <h1 className='title'><NavLink className="navLink" to="/">SmartContracts</NavLink></h1>
          {/* <h1 className='title'>SmartContracts</h1> */}

        </>
      )
      }


    </nav>
  )
}

export default NavBar
