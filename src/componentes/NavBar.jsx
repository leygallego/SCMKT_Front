import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './NavBar.css';
// import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth0 } from "@auth0/auth0-react"
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

  return (
      <div className="navbar">
        <nav>
          {/* <div className="links" id={showLinks ? "hidden" : ""}> */}
          <div className="links">

            <ul>
              {/* <button className="reorder-button" onClick={()=> setShowLinks(!showLinks)}>
            <ReorderIcon />
          </button> */}

              <li className="smart" >
                <NavLink to="/"> <span>SmartContracts</span> </NavLink>
              </li>
              <li>
                <NavLink to="/contratos">Contratos</NavLink>
              </li>
              <li>
                <NavLink to="/aboutus">Quienes Somos</NavLink>
              </li>
              {
                isAuthenticated ?
                  (
                    <div>
                      <ul>

                        <li>
                          <NavLink to="/perfil">Perfil</NavLink>
                        </li>

                        <div className="logout-button">
                        <li>
                          <button className="logout-button" onClick={logout}>Logout</button>
                        </li>
                        </div>
                        <li>
                          <NavLink to="/chat">Chat</NavLink>
                        </li>




                      </ul>
                    </div>
                  )
                  : (
                    <div className="login-button">
                      <ul>
                        <li>
                          <Button variant='contained' onClick={loginWithRedirect} >Iniciar Sesión</Button>
                        </li>

                        {/* <li>
                    <NavLink to="/registro"> <Button variant="contained">Registrarse</Button> </NavLink>
                  </li> */}
                      </ul>
                    </div>
                  )
              }
            </ul>

          </div>
        </nav>
      </div>
  )
}

export default NavBar
