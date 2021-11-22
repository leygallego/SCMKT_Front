import React from 'react';
import { NavLink } from 'react-router-dom';
// import Button from '@mui/material/Button';
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
    <div>

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
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/contratos">Contratos</NavLink>
              </li>
              {/* <li>
                <NavLink to="/perfil">Perfil</NavLink>
              </li> */}
              {
                isAuthenticated ?
                  (
                    <div>
                      <ul>

                        <li>
                          <NavLink to="/perfil">Perfil</NavLink>
                        </li>


                        <li>
                          <button onClick={logout}>Logout</button>
                        </li>




                      </ul>
                    </div>
                  )
                  : (
                    <div>
                      <ul>
                        <li>
                          <button onClick={loginWithRedirect} >Iniciar Sesión</button>
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

    </div>
  )
}

export default NavBar
