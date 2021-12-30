import React, { useState, useEffect } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, sendLogin, getContracts, setChat, configChannel, eraseMessage, setLoading } from '../actions';
import { useAuth0 } from "@auth0/auth0-react";
import Countries from './countries';
import Uploadimage from './UploadImage';
import './Profile.css';
import Spinner from './Spinner';
import ContractsList from './ContractsList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

import useMetaMask from '../hooks/useMetaMask'

toast.configure()

function Profile() {

    const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()

    const user = useSelector(state => state.user)
    const contracts = useSelector(state => state.contracts)
    const { profileImage, spinner, loading } = useSelector(state => state);
    const [edicionPerfil, setEdicionPerfil] = useState(true)
    const [registro, setRegistro] = useState({});
    const [eraser, setEraser] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(callProtectedApi)
        dispatch(setChat(false));
        dispatch(getContracts({ ownerId: user.id }))
        dispatch(setLoading(false))

        // dispatch(configChannel(""));
        dispatch(eraseMessage([]));
    }, [dispatch])

    const {
        getAccessTokenSilently,
    } = useAuth0();

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            dispatch(sendLogin(token))
        } catch (error) {
            console.log('Error en el perfil ', error)
        }
    }

    const handleOnChange = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
    }

    const handleEdition = () => {
        setEdicionPerfil(edicionPerfil => !edicionPerfil)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const registro2 = {
            ...user,
            name: `${registro['name'] ? registro.name : user.name}`,
            last_name: `${registro['last_name'] ? registro.last_name : user.last_name}`,
            country: `${registro['country'] ? registro.country : user.country}`,
            wallet: `${registro['wallet'] ? registro.wallet : user.wallet}`,
            image: `${profileImage}`
        }
        dispatch(editUser(user.id, registro2));
        handleEdition();

        toast('Has editado tus datos')
    }


    return (
        <>
            {loading
                ? <Loader />
                :
                <div className="main-perfil">
                    <div className="perfil-card">
                        <h2>Usuario: {user.name}</h2>

                        <div className="contratos-publicados2">
                            <ContractsList
                                contratos={contracts}
                            />
                        </div>
                    </div>

                    <div className="area-perfil">
                        {spinner ? <Uploadimage
                            image={profileImage}
                            id={user.id}
                            user={user}
                        /> : <Spinner />}


                        <br />
                    <div className="boton-wallet">

                    <Button
                        className="busca-wallet"
                        variant="contained"
                        startIcon={<AccountBalanceWalletIcon />}
                        onClick={isActive ? disconnect : connect}>
                        {isActive ? 'Desconectar' : 'Conectar Wallet'}

                    </Button>

                    </div>

                    

                    <div className="datos-personales" >
                        <Button
                            className="busca-datos"
                            variant="contained"
                            startIcon={<CreateIcon />}
                            onClick={handleEdition}>
                            Datos Personales
                        </Button>
                        {edicionPerfil ? <div className="profileDataView">
                        <br /><h4>Nombre: {user.name} {user.last_name}</h4> <br />
                            <h4>Usuario: {user.username}</h4><br />
                            <h4>Email: {user.email}</h4><br />
                            <h4>Nº Wallet: {/*user.wallet*/account}</h4><br />
                            <h4>País Residencia: {user.country}</h4><br />
                        </div> :
                            <form onSubmit={e => { handleOnSubmit(e) }}>
                                <div className="registro1">
                                    <div className="labelInput">
                                        <div className="labelForm">Nombre</div>
                                        <div className="inputForm"><input className="inputFormComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} placeholder={user.name} /></div>
                                    </div>
                                    <div className="labelInput">
                                        <div className="labelForm">Apellido</div>
                                        <div className="inputForm"><input className="inputFormComponent" type="text" name="last_name" onChange={e => { handleOnChange(e) }} placeholder={user.last_name} /></div>
                                    </div>
                                    <div className="labelInput">
                                        <div className="labelForm">País</div>
                                        <div className="selectPais">
                                            <select className="inputFormComponent" name="country" onChange={e => { handleOnChange(e) }} defaultValue={user.country}  >
                                                {Countries.map((element, index) => {
                                                    return (
                                                        <option key={index}>{element}</option>
                                                    )
                                                })
                                                }
                                            </select></div>
                                    </div>
                                    {
                                        user.wallet === null || user.wallet === 'undefined' || user.wallet?.length <= 0 ? <div className="labelInput">
                                            <div className="labelForm">Wallet</div>
                                            <div className="inputForm"><input className="inputFormComponent" type="text" name="wallet" onChange={e => { handleOnChange(e) }} placeholder={user.wallet} /></div>
                                        </div>
                                            : <div></div>
                                    }


                        <div className="datos-personales" >
                            <Button
                                className="busca-datos"
                                variant="contained"
                                startIcon={<CreateIcon />}
                                onClick={handleEdition}>
                                Datos Personales
                            </Button>
                            {edicionPerfil ? <div className="profileDataView">
                                <br /><h4>Nombre: {user.name} {user.last_name}</h4> <br />
                                <h4>Usuario: {user.username}</h4><br />
                                <h4>Email: {user.email}</h4><br />
                                <h4>Nº Wallet: {user.wallet}</h4><br />
                                <h4>País Residencia: {user.country}</h4><br />
                            </div> :
                                <form onSubmit={e => { handleOnSubmit(e) }}>
                                    <div className="registro1">
                                        <div className="labelInput">
                                            <div className="labelForm">Nombre</div>
                                            <div className="inputForm"><input className="inputFormComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} placeholder={user.name} /></div>
                                        </div>
                                        <div className="labelInput">
                                            <div className="labelForm">Apellido</div>
                                            <div className="inputForm"><input className="inputFormComponent" type="text" name="last_name" onChange={e => { handleOnChange(e) }} placeholder={user.last_name} /></div>
                                        </div>
                                        <div className="labelInput">
                                            <div className="labelForm">País</div>
                                            <div className="selectPais">
                                                <select className="inputFormComponent" name="country" onChange={e => { handleOnChange(e) }} defaultValue={user.country}  >
                                                    {Countries.map((element, index) => {
                                                        return (
                                                            <option key={index}>{element}</option>
                                                        )
                                                    })
                                                    }
                                                </select></div>
                                        </div>
                                        {
                                            user.wallet === null || user.wallet === 'undefined' || user.wallet?.length <= 0 ? <div className="labelInput">
                                                <div className="labelForm">Wallet</div>
                                                <div className="inputForm"><input className="inputFormComponent" type="text" name="wallet" onChange={e => { handleOnChange(e) }} placeholder={user.wallet} /></div>
                                            </div>
                                                : <div></div>
                                        }

                                        <div className="buttonFormComponent"><input className="botonEditar" type="submit" value="Editar" /></div>
                                    </div>

                                </form>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile;
