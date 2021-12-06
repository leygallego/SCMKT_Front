import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getDownloadURL, uploadBytesResumable, ref as refStorage } from 'firebase/storage';
import { storage } from '../firebase';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, sendLogin, stopUser, getContracts, contratos, deleteContract, sendNotification } from '../actions';
import { useAuth0 } from "@auth0/auth0-react"
import Countries from './countries';
import DeleteIcon from '@mui/icons-material/Delete';

function Profile() {


    let p = [];
    let d = [];
    let o = [];
    const c = useSelector(state => state.contratos)
    const { user } = useSelector(state => state)
    const [userHook, setUserHook] = useState();
    const [edicionPerfil, setEdicionPerfil] = useState(true)
    const [registro, setRegistro] = useState({});
    const [avatarImage, setAvatarImage] = useState("/images/silueta.png");
    const [eraser, setEraser] = useState([]); // Array de id de contratos a borrar

    const inputFileRef = useRef();
    const uploadButton = useRef();

    const dispatch = useDispatch();

    const handleBtnClick = () => {
        inputFileRef.current.click();
    }
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
        handleOnSubmit(e);
    }

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = refStorage(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setAvatarImage(url);

                        setRegistro({
                            ...registro,
                            image: url
                        })
                        setTimeout(() => {
                            const registro2 = {
                                ...user,
                                name: `${registro['name'] ? registro.name : user.name}`,
                                last_name: `${registro['last_name'] ? registro.last_name : user.last_name}`,
                                country: `${registro['country'] ? registro.country : user.country}`,
                                wallet: `${registro['wallet'] ? registro.wallet : user.wallet}`,
                                image: `${registro['image'] ? registro.image : user.image}`
                            }
                            dispatch(editUser(user.id, registro2));
                        }, 1500);
                        user.image = url;
                    })
            }
        )
    };

    useEffect(() => {
        // dispatch(getContracts('', '', '', '', '', '', '', ''))
        dispatch(contratos())
        dispatch(callProtectedApi)
        setUserHook(user);
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

     const sendmail = {
        to: user.email,
        subject: 'Edición de datos',
        text: `${user.name} acabas de editar tus datos personales `,
        html: <strong>`${user.name} acabas de editar tus datos personales`</strong>

    }

    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const registro2 = {
            ...user,
            name: `${registro['name'] ? registro.name : user.name}`,
            last_name: `${registro['last_name'] ? registro.last_name : user.last_name}`,
            country: `${registro['country'] ? registro.country : user.country}`,
            wallet: `${registro['wallet'] ? registro.wallet : user.wallet}`,
            image: `${registro['image'] ? registro.image : user.image}`
        }
        dispatch(editUser(user.id, registro2));
        handleEdition();

        // dispatch(sendNotification(sendmail))
        // console.log("profile dispatch",sendmail);
          
    }

    c.map(element => {
        if (element.status === "published" || element.status === "taken") {
            p.push(element);
        }
        if (element.status === "unpublished") {
            o.push(element);
        }
        if (element.status === "complete") {
            d.push(element);
        }
        return (<></>)
    })

    function handelFileChange(e) {
        console.log("Cambiò la imagen");
        uploadButton.current.click();
        const registro2 = {
            ...user,
            name: `${registro['name'] ? registro.name : user.name}`,
            last_name: `${registro['last_name'] ? registro.last_name : user.last_name}`,
            country: `${registro['country'] ? registro.country : user.country}`,
            wallet: `${registro['wallet'] ? registro.wallet : user.wallet}`,
            image: `${registro['image'] ? registro.image : user.image}`
        }
        dispatch(editUser(user.id, registro2));
        //console.log("Soy el Nuevo Registro", registro);
        handleEdition();

    }

    const borraContratos = () => {
        dispatch(deleteContract({"contract": eraser}));
        // setEraser([]);
    }

    const onCheck = (e) => {
        let er = eraser;
        er.push(e.target.name)
        setEraser(
            er
        )
    }

    return (
        <>
            <div><h1>Perfil de Usuario</h1></div>

            <div className="main-perfil">
                <div className="perfil-card">
                    <h4>Usuario: {user.name}</h4>

                    <div className="contratos-publicados">
                        <h5>Contratos Publicados</h5>
                        {p ? p.map((element, index) => {
                            return (
                                <div key={index} className="info-contrato">
                                    <h6>{element.conditions.name}</h6>
                                    <h6>{element.conditions.amount}</h6>
                                    <NavLink to={`/detalle/${element.id}`}><h6>ver detalles</h6></NavLink>
                                </div>
                            )
                        }) : <></>}

                    </div>
                    <div className="contratos-borradores">
                        <div className='borradoresRow'>
                            <h5>Borradores</h5>
                            <Button
                                variant="error"
                                startIcon={<DeleteIcon />}
                                onClick={borraContratos}
                            />
                        </div>

                        {o ? o.map((element, index) => {
                            return (
    
                                <div className='borradoresContracts'>
                                    <div key={index} className="info-contrato">
                                        <h6>{element.conditions.name}</h6>
                                        <h6>{element.conditions.amount}</h6>
                                        <NavLink to={`/detalle/${element.id}`}><h6>ver detalles</h6></NavLink>
                                    </div>
                                    <input type="checkbox" name={element.id} onChange={e => {onCheck(e)}}/>
                                </div>

                            )
                        }) : <></>}

                    </div>
                    <div className="contratos-finalizados">
                        <h5>Contratos Finalizados</h5>
                        {d ? d.map((element, index) => {
                            return (
                                <div key={index} className="info-contrato">
                                    <h6>{element.conditions.name}</h6>
                                    <h6>{element.conditions.amount}</h6>
                                    <NavLink to={`/detalle/${element.id}`}><h6>ver detalles</h6></NavLink>
                                </div>
                            )
                        }) : <></>}

                    </div>

                </div>

                <div className="area-perfil">

                    <div className="imageCircle">
                        {user.image ? <img className="imageCircle" src={user.image} alt="imagen de silueta" /> : <img className="imageCircle" src={avatarImage} alt="imagen de silueta" />}
                        <input type="button" onClick={handleBtnClick} value="v/" />
                    </div>

                    <form onSubmit={formHandler}>
                        <input className="avatarInput" type="file" ref={inputFileRef} onChange={(e) => { handelFileChange(e) }} />
                        {/* <input className="avatarInput" type="file" accept="image/png,image/jpeg" ref={inputFileRef} /> */}
                        <button className="avatarInput" type='submit' ref={uploadButton}>Upload</button>
                    </form>

                    <Button
                        className="busca-wallet"
                        variant="contained"
                        startIcon={<AccountBalanceWalletIcon />}>
                        Dirección de Wallet
                    </Button>

                    <div className="datos-personales" >
                        <Button
                            className="busca-datos"
                            variant="contained"
                            startIcon={<CreateIcon />}
                            onClick={handleEdition}>
                            Datos Personales
                        </Button>
                        {edicionPerfil ? <div>
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
                                        <div className="inputForm"><input className="inputFormComponent" type="text" name="name" onChange={e => { handleOnChange(e) }} placeholder={user.name} /></div>
                                    </div>
                                    <div className="labelInput">
                                        <div className="labelForm">Apellido</div>
                                        <div className="inputForm"><input className="inputFormComponent" type="text" name="last_name" onChange={e => { handleOnChange(e) }} placeholder={user.last_name} /></div>
                                    </div>
                                    <div className="labelInput">
                                        <div className="labelForm">País</div>
                                        <div>
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
        </>
    )
}

export default Profile;
