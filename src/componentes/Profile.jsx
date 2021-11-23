import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../actions';
import { sendLogin } from '../actions';
import { useAuth0 } from "@auth0/auth0-react"
import axios from 'axios';





function Profile() {

    const usuarios = useSelector(state => state.users)
    const contratos = useSelector(state => state.contracts)
    const user = useSelector(state => state.user)

    console.log("USUARIO====", user);
    const dispatch = useDispatch();
    const {
        getAccessTokenSilently,
      } = useAuth0();
    
    async function callProtectedApi() {
    const token = await getAccessTokenSilently();
    dispatch(sendLogin(token))
    const response = await axios.get('https://scmkt.herokuapp.com/user/login', {
        headers: {
            Authorization: `Bearer ${token}`
            }
        });
    }

    dispatch(callProtectedApi)
    

    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    console.log("Contratos", contratos);
    console.log("Usuarios",usuarios);

    const Countries = ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
    "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
    "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

    const [edicionPerfil, setEdicionPerfil] = useState(true)
    // const [bool, setBool] = useState(true);
    const [registro, setRegistro] = useState({
        name: "",
        last_name: "",
        country: "",
        wallet: ""
    });

    const handleOnChange = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
        console.log(registro)
    }


    const handleEdition = ()=>{
        setEdicionPerfil(edicionPerfil => !edicionPerfil)
        
    }

    // const handleOnClick = () => {
    //     setBool(false)
    // }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("submit",registro)

        dispatch(editUser(user.id, registro));
            console.log("el registro", registro);
            
            setRegistro({
                name: "",
                last_name: "",
                country: "",
                wallet: ""
            });
            alert("Enviado correctamente")

        // if (
        //     registro.name === "" || registro.last_name === ""
        //     || registro.country === "" || registro.wallet === ""

        // ) {
        //     console.log('Formulario incompleto...')
        // } else {
        //     dispatch(editUser(user.id, registro));
        //     console.log("el registro", registro);
            
        //     setRegistro({
        //         name: "",
        //         last_name: "",
        //         country: "",
        //         wallet: ""
        //     });
        //     alert("Enviado correctamente")

        // }
    }

    return (
        <>
        <div><h1>Componente Perfil</h1></div>

        <div className="main-perfil">
            <div className="perfil-card">
                <h4>Bienvenido {user.name}</h4>

                <div className="contratos-publicados">
                    <h5>Contratos Publicados</h5>
                    {contratos.map((contrato, index) =>{
                        return(
                            <div className="info-contrato" key={index}>
                                <h6>{contrato.name}</h6>
                                <h6>{contrato.value} </h6>
                                <NavLink to="/detallecontratospub"><h6>{contrato.detail}</h6></NavLink>
                            </div>
                        )
                    })}
                  
                </div>
                <div className="contratos-borradores">
                <h5>Borradores</h5>
                <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <NavLink to="/detallecontratosbor"><h6>view details</h6></NavLink>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <NavLink to="/detallecontratosbor"><h6>view details</h6></NavLink>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <NavLink to="/detallecontratosbor"><h6>view details</h6></NavLink>
                    </div>

                </div>
                <div className="contratos-finalizados">
                <h5>Contratos Finalizados</h5>
                <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <NavLink to="/detallecontratosfin"><h6>view details</h6></NavLink>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <NavLink to="/detallecontratosfin"><h6>view details</h6></NavLink>
                    </div>
                    <div className="info-contrato">
                        <h6>Nombre del contrato</h6>
                        <h6>0.056489398</h6>
                        <NavLink to="/detallecontratosfin"><h6>view details</h6></NavLink>
                    </div>

                </div>

            </div>

            <div className="area-perfil">
            <img src="/images/silueta.png" alt="imagen de silueta" />


                
            <Button
                            className="busca-wallet"
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                        >Dirección de Wallet</Button>
                    <div className="datos-personales" >


                    <Button
                            className="busca-datos"
                            variant="contained"
                            startIcon={<CreateIcon />}
                            onClick={handleEdition}
                        >Datos Personales</Button> 
                        {
                            edicionPerfil ? <div>
                        <h6>Nombre: {user.name} {user.last_name}</h6> 
                        <h6>Usuario: {user.username}</h6>
                        <h6>Email: {user.email}</h6>
                        <h6>Nº Wallet: {user.wallet}</h6>
                        <h6>País Residencia: {user.country}</h6>
                        
                        


                            </div> : 
                            <form onSubmit={e => { handleOnSubmit(e) }}>
                            <div className="registro1">
                                <div className="labelInput">
                                    <div className="labelForm">Nombre</div>
                                    <div className="inputForm"><input className="inputFormComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} placeholder={user.name}  /></div>
                                </div>
                                <div className="labelInput">
                                    <div className="labelForm">Apellido</div>
                                    <div className="inputForm"><input className="inputFormComponent" type="text" name="last_name" onChange={e => { handleOnChange(e) }} placeholder={user.last_name} /></div>
                                </div>
                                {/* <div className="labelInput">
                                    <div className="labelForm">Nombre de usuario</div>
                                    <div className="inputForm"><input className="inputFormComponent" type="text" name="username" onChange={e => { handleOnChange(e) }} placeholder={user.username} /></div>
                                </div> */}
                                {/* <div className="labelInput">
                                    <div className="labelForm">Email</div>
                                    <div className="inputForm"><input className="inputFormComponent" type="text" name="email" onChange={e => { handleOnChange(e) }} placeholder={user.email} /></div>
                                </div> */}
                                <div className="labelInput">
                                    <div className="labelForm">País</div>
                                    <div>
                                        <select className="inputFormComponent" name="country" onChange={e => { handleOnChange(e) }} defaultValue={user.country}  >
                                            {
                                                Countries.map((element, index) => {
                                                    return (
                                                        <option key={index}>{element}</option>
                                                    )
                                                })
                                            }
                                        </select></div>
                                </div>
                                <div className="labelInput">
                                    <div className="labelForm">Wallet</div>
                                    <div className="inputForm"><input className="inputFormComponent" type="text" name="wallet" onChange={e => { handleOnChange(e) }} placeholder={user.wallet}  /></div>
                                </div>
                                <div className="buttonFormComponent"><input className="botonEditar" type="submit" value="Editar" /></div>
                            </div>
                                
                        </form>
                        }
                        
                        {/* {usuarios.map((usuario, index) =>{
                           return (<div key={index}>
                               <h6>{usuario.name}</h6>
                               <p>{usuario.email}</p>
                               </div>)
                        })} */}
                  </div>          
            </div>

        </div>







{/* <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/home"> <span><h4>SmartContracts</h4></span> </NavLink>                    <div className="logos-footer">
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
            </div> */}

        
        </>
    )
}

export default Profile
