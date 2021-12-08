import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, sendLogin, getContracts, deleteContract } from '../actions';
import { useAuth0 } from "@auth0/auth0-react";
import Countries from './countries';
import DeleteIcon from '@mui/icons-material/Delete';
import Uploadimage from './UploadImage';
import ContractsCard from './ContractsCard';
import Swal from 'sweetalert2';
import './Profile.css';
import Spinner from './Spinner';

function Profile() {

    let p = [];
    let d = [];
    let o = [];
    const c = useSelector(state => state.contracts)
    const { user } = useSelector(state => state)
    const { profileImage, spinner } = useSelector(state => state);
    // const { spinner } = useSelector(state => state);
    const [edicionPerfil, setEdicionPerfil] = useState(true)
    const [registro, setRegistro] = useState({});
    const [eraser, setEraser] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContracts({ ownerId: user.id }))
        dispatch(callProtectedApi)
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



    const borraContratos = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(deleteContract({ "contract": eraser }));

                Swal.fire('Saved!', '', 'success')
            } //else if (result.isDenied) {
              //  Swal.fire('Changes are not saved', '', 'info')
           // }
        })
    }

    const onCheck = (e) => {
        let er = eraser;
        er.push(e.target.name)
        setEraser(
            er
        )
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
    }


    return (
        <>
            <div><h1>Perfil de Usuario</h1></div>
            <div className="main-perfil">
                <div className="perfil-card">
                    <h4>Usuario: {user.name}</h4>

                    <div className="contratos-publicados">
                        <h5>Contratos Publicados</h5>
                        <div className='scrolling'>
                            {p ? p.map((element, index) => {
                                return (
                                    <ContractsCard
                                        key={index}
                                        name={element.conditions.name}
                                        amount={element.conditions.amount}
                                        id={element.id}
                                        check={false}
                                    />
                                )
                            }) : <></>}
                        </div>

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
                        <div className='scrolling'>

                            {o ? o.map((element, index) => {
                                return (
                                    <div key={index} className='borradoresContracts'>
                                        <div key={index} className="info-contrato">
                                            <h6>{element.conditions.name}</h6>
                                            <h6>{element.conditions.amount}</h6>
                                            <NavLink to={`/detalle/${element.id}`}><h6>ver detalles</h6></NavLink>
                                        </div>
                                        <input type="checkbox" name={element.id} onChange={e => { onCheck(e) }} />
                                    </div>

                                )
                            }) : <></>}
                        </div>

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
                    {spinner ? <Uploadimage
                        image={profileImage}
                        id={user.id}
                        user={user}
                    /> : <Spinner />}


                    <br />
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
                        {edicionPerfil ? <div className="profileDataView">
                            <h4>Nombre: {user.name} {user.last_name}</h4>
                            <h4>Usuario: {user.username}</h4>
                            <h4>Email: {user.email}</h4>
                            <h4>Nº Wallet: {user.wallet}</h4>
                            <h4>País Residencia: {user.country}</h4>
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
