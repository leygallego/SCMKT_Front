import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './NavBar.css';
import { useAuth0 } from '@auth0/auth0-react';
import ReorderIcon from '@mui/icons-material/Reorder';

function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently
  } = useAuth0();

  return (
    <div>
      <div className="navbar">
        <nav>
          <div className="links" id={showLinks ? "hidden" : ""}>
            <ul>
              {/* <button className="reorder-button" onClick={()=> setShowLinks(!showLinks)}>
            <ReorderIcon />
          </button> */}

              <li>
                <NavLink to="/"> <span>SmartContracts</span> </NavLink>
              </li>
              <li>
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/contratos">Contratos</NavLink>
              </li>
              <li>
                <NavLink to="/aboutus">Quiénes Somos</NavLink>
              </li>
              <li>
                <NavLink to="/registro"> <Button variant="contained">Sign up</Button> </NavLink>
              </li>
              <li>
                <a href='/login'>Login</a>
                <button onClick={loginWithPopup}>Login PopUp</button>
                <button onClick={getAccessTokenSilently}>Token</button>
                {isAuthenticated}
                {isAuthenticated
                 ?<button onClick={loginWithRedirect}>Login Redirect</button>
                 :<button onClick={logout}>Logout</button>
                }
                {user}
              </li>
            </ul>
          </div>

        </nav>
      </div>

    </div>
  )
}

export default NavBar
