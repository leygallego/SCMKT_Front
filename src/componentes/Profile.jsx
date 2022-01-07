import React, { useState, useEffect } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, sendLogin, getContracts, setChat, eraseMessage, setLoading, getUsers } from '../actions';
import { useAuth0 } from "@auth0/auth0-react";
import Countries from './countries';
import Uploadimage from './UploadImage';
import Spinner from './Spinner';
import ContractsList from './ContractsList';
import { toast } from 'react-toastify';
import Loader from './Loader';
import useMetaMask from '../hooks/useMetaMask'
import './styles/Profile.css';
import 'react-toastify/dist/ReactToastify.css';

import { Octokit } from "octokit";

const { Base64 } = require("js-base64")
const { createOAuthAppAuth, createOAuthDeviceAuth, createOAuthUserAuth } = require('@octokit/auth-oauth-app');
require('dotenv').config();

const octokit = new Octokit({
    // authStrategy: createOAuthAppAuth,
    // auth: {
    //   clientType: 'github-app',
    //   clientId: 'd1caa78b0df97e743827',
    //   scopes: ['user', 'public_repo', 'repo'],
    //   onVerification(verification) {
    //     console.log('Open %s', verification.verification_uri);
    //     console.log('Enter code: %s', verification.user_code);
    //   },
    // },
    auth: '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'
})


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
        dispatch(getUsers());
        dispatch(setLoading(true))
        dispatch(callProtectedApi)
        dispatch(setChat(false));
        dispatch(getContracts({ ownerId: user.id }))
        dispatch(setLoading(false))
        dispatch(eraseMessage([]));
    }, [dispatch])


    const {
        getAccessTokenSilently,
    } = useAuth0();

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();

        try {
            await dispatch(sendLogin(token))
        } catch (error) {
            console.log('Error en el perfil ', error)
        }
    }

    async function getRepo() {
        try {
            let owner = 'zzzNitro'
            let name = 'prueba-tests1'
            let collab = 'pmarchionno'
            let file = 'value sacado del state'

            // //const content = "empty string for testing"//fs.readFileSync('./models.js', 'utf-8')
            // //const content = fetch("https://firebasestorage.googleapis.com/v0/b/henryfrontimages.appspot.com/o/documents%2F1fd73620-8885-462f-ba8b-8e7525b0b87d%2Fmodels.js?alt=media&token=03d99b70-98f3-4263-a0d0-b535d01b7940").then((r)=>{r.text().then((d)=>{let CONTENT = d})})
            // const contentEncoded = Base64.encode(file)

            octokit.request(`PUT /repos/${owner}/${name}/collaborators/${collab}`, {
                owner: owner,
                repo: name,
                username: `${collab}`,
                permission: 'push'
            }).then(console.log, console.log)

            // octokit.request('POST /user/repos', {
            //     name: name
            // }).then(console.log, console.log);

            // octokit.request('GET /user')
            //     .then(console.log, console.log);

            // const { data } = await octokit.repos.createOrUpdateFileContents({
            //     owner: owner,
            //       repo: "octokit-create-file-example",
            //       path: "OUTPUT.md",
            //       message: "feat: Added OUTPUT.md programatically",
            //       content: file,
            //       committer: {
            //         name: owner,
            //         email: 'pablo.benito@rocketmail.com',
            //       },
            //       author: {
            //         name: owner,
            //         email: 'pablo.benito@rocketmail.com',
            //       },
            //     });
            //     console.log(data)
            // octokit.request(`PUT /repos/${owner}/${name}/contents/tests/test.js`, {
            //     owner: owner,
            //     repo: name,
            //     message: "feat: Added test.js programatically",
            //     content: contentEncoded,
            // }).then(console.log, console.log);


        } catch (err) {
            console.log(err)
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
            image: `${user.image}`
        }
        dispatch(editUser(user.id, registro2));
        handleEdition();

        toast('Has editado tus datos')
    }


    return (
        <>


            {loading
                ? <Loader />
                : <div className="main-perfil">
                    <div className='perfil-title'>
                        <h2>Hola {user.name}</h2>
                    </div>
                    <div className="perfil-card">
                        <div className="contratos-publicados2">
                            <ContractsList />
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
                                <br />
                                <div>Email: {user.email} </div>
                                <div>Usuario: {user.username} </div>
                                <div>Nombre: {user.name} {user.last_name} </div>
                                <div>Wallet: {isActive ? account : 'MetaMask Desconectada'} </div>
                                <div>País Residencia: {user.country} </div><br />
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
