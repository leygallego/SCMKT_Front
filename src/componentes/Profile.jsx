import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getDownloadURL, uploadBytesResumable, ref as refStorage } from 'firebase/storage';
import { storage } from '../firebase';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, sendLogin, stopUser, getContracts, contratos } from '../actions';
import { useAuth0 } from "@auth0/auth0-react"
import axios from 'axios';
import Countries from './countries';


// const c = [{ "id": "250bbbc2-8d8c-4f28-a96c-d70418d6aee4", "wallet1": "6d6e55fa-7aa7-4b35-8c1d-b772c02572bb", "wallet2": "3b09a6f3-a61a-48af-9f84-d2f9f8167a91", "conditions": { "name": "mally Poreless Perfection Glowing Foundation Tan", "type": "type1", "duration": "10", "category": "category1", "shortdescription": "Supplement Left Lacrimal Duct with Nonaut Sub, Endo", "longdescription": "Other repair of laceration of eyelid, partial-thickness", "amount": "$5.68", "coin": "Yuan Renminbi", "condition": { "c1": "mally Poreless Perfection Glowing Foundation Tan", "c2": "Mawhinney" } }, "status": "otro" }, { "id": "33a91796-6f7a-49aa-a4d8-ecd37adcc736", "wallet1": "7047c56d-1c54-4a27-bc32-09ed7039dd0e", "wallet2": "0312a9d4-40d9-40b4-9425-7da178f22f2b", "conditions": { "name": "Suboxone", "type": "type1", "duration": "10", "category": "category1", "shortdescription": "Excision of Right Thorax Muscle, Perc Endo Approach", "longdescription": "Repair of current obstetric laceration of corpus uteri", "amount": "$1.14", "coin": "Rial", "condition": { "c1": "Suboxone", "c2": "Dumbarton" } }, "status": "pending" }, { "id": "24d59ef0-c136-49de-b43c-0ef76734957c", "wallet1": "86f0c320-74d0-42d6-afa1-1c66c01b2a75", "wallet2": "c564d34d-5d85-4390-8a4e-10a41ae73379", "conditions": { "name": "Simvastatin", "type": "type1", "duration": "10", "category": "category1", "shortdescription": "Repair Right External Ear, Open Approach", "longdescription": "Revision of ureterointestinal anastomosis", "amount": "$3.65", "coin": "Dollar", "condition": { "c1": "Simvastatin", "c2": "Grace" } }, "status": "done" }, { "id": "c7ca0a77-acb7-4934-a586-c47d86032373", "wallet1": "16af5241-cef6-4e2b-a244-83bd6dfe70f1", "wallet2": "1c471904-3f51-4051-b02a-fa4fc7fb5884", "conditions": { "name": "Olanzapine", "type": "type2", "duration": "20", "category": "category2", "shortdescription": "Supplement Head with Synthetic Substitute, Open Approach", "longdescription": "Other operations on cornea", "amount": "$5.66", "coin": "Euro", "condition": { "c1": "Olanzapine", "c2": "Fettiplace" } }, "status": "pending" }, { "id": "7b75d9c9-b089-4e4d-a740-bf89c5c9f329", "wallet1": "35e1d828-0379-4147-a39f-e2f4c4f2fe36", "wallet2": "d60e98e7-cb53-4b53-9f8c-e873c153059a", "conditions": { "name": "Hydrocortisone", "type": "type2", "duration": "30", "category": "category2", "shortdescription": "Bypass L Fallopian Tube to L Fallop w Nonaut Sub, Perc Endo", "longdescription": "Other arthrotomy, other specified sites", "amount": "$8.06", "coin": "Zloty", "condition": { "c1": "Hydrocortisone", "c2": "Lyford" } }, "status": "pending" }, { "id": "79961e33-5065-46fd-ac6b-d948d24f41f9", "wallet1": "d862e709-2a91-43d7-8c61-7e60a1db253f", "wallet2": "b79e9517-ce8c-4f3a-8c9e-3c2f57046bfd", "conditions": { "name": "NEXICLEAR ACNE TREATMENT", "type": "type3", "duration": "10", "category": "category1", "shortdescription": "Dilation of R Ext Carotid with 3 Drug-elut, Perc Approach", "longdescription": "Sphenoidectomy", "amount": "$6.98", "coin": "Real", "condition": { "c1": "NEXICLEAR ACNE TREATMENT", "c2": "Mathon" } }, "status": "done" }, { "id": "28dbbfb7-9645-4ace-a05a-b30cc299b652", "wallet1": "1d06325c-91a3-4a83-aea3-2619832815ec", "wallet2": "ca79e1de-7c32-4d18-bfec-6f59ddff156c", "conditions": { "name": "Simcor", "type": "type2", "duration": "10", "category": "category1", "shortdescription": "Destruction of Anus, Open Approach", "longdescription": "Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, cell block and Papanicolaou smear", "amount": "$1.76", "coin": "Peso", "condition": { "c1": "Simcor", "c2": "Vicioso" } }, "status": "done" }, { "id": "b0c2e3a9-e849-4b22-bb6f-868b5360e4a5", "wallet1": "2d7554fc-f20e-4527-9957-fcad26fe92ba", "wallet2": "1c00f51b-87b2-4831-8c4d-49b6ea7631a1", "conditions": { "name": "Rx Act all day pain relief", "type": "type1", "duration": "20", "category": "category3", "shortdescription": "Replacement of L Post Tib Art with Nonaut Sub, Open Approach", "longdescription": "Correction of ureteropelvic junction", "amount": "$5.56", "coin": "Peso", "condition": { "c1": "Rx Act all day pain relief", "c2": "Duffer" } }, "status": "pending" }, { "id": "a80ed501-693f-42f4-a528-9bf1f9c1fabb", "wallet1": "ff0d4c55-0f54-4c91-8ef0-7e4fb1ca787b", "wallet2": "a75e4fe2-ac54-465b-a450-2fb00cdea362", "conditions": { "name": "Isovue-M", "type": "type2", "duration": "10", "category": "category3", "shortdescription": "Transplantation of Nervous System into POC, Perc Approach", "longdescription": "Lysis of other anterior synechiae", "amount": "$8.77", "coin": "Real", "condition": { "c1": "Isovue-M", "c2": "Joselin" } }, "status": "pending" }, { "id": "592ffd96-dd02-4a33-b479-e2235f15ee6a", "wallet1": "d701d5cc-bc3f-4a6b-a85e-400567015bfd", "wallet2": "f35ee685-3549-4349-834c-ccb343b4f83c", "conditions": { "name": "Metformin Hydrochloride", "type": "type2", "duration": "40", "category": "category1", "shortdescription": "Isotope Administration to Whole Body using Strontium 90", "longdescription": "Closed reduction of separated epiphysis, other specified bone", "amount": "$5.60", "coin": "Yuan Renminbi", "condition": { "c1": "Metformin Hydrochloride", "c2": "Scudder" } }, "status": "pending" }];

function Profile() {

    // const [pendingContracts, setPendingContracts] = useState([]);
    // const [doneContracts, setDoneContracts] = useState([]);
    // const [otroContracts, setOtroContracts] = useState([]);
    // const usuarios = useSelector(state => state.users)
    const c = useSelector(state => state.contratos)
    const { user } = useSelector(state => state)
    // console.log('CONTRATOS::::::', contratosData);

    // const [progress, setProgress] = useState(0);
    const [userHook, setUserHook] = useState();
    const [avatarImage, setAvatarImage] = useState("/images/silueta.png");
    const inputFileRef = useRef();
    const uploadButton = useRef();
    const dispatch = useDispatch();
    const handleBtnClick = () => {
        inputFileRef.current.click();
        uploadButton.current.click();
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

        uploadTask.on("state_changed", (snapshot) => {
            // const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setAvatarImage(url)
                        setRegistro({
                            ...registro,
                            image: url
                        })
                        console.log("Imagen subida exitosamente...");
                    })
            }
        )
    };



    useEffect(() => {
        // dispatch(getContracts('', '', '', '', '', '', '', ''))
        dispatch(contratos())
        dispatch(callProtectedApi)
        setUserHook(user);
console.log('SOy User',user)
    }, [dispatch])

    //console.log(user)

    const {
        getAccessTokenSilently,
    } = useAuth0();

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            dispatch(sendLogin(token))
            // const response = await axios.get('https://scmkt.herokuapp.com/user/login', {
            // await axios.get('https://scmkt.herokuapp.com/user/login', {
            // headers: {
            //     Authorization: `Bearer ${token}`
            //     }
            // });
        } catch (error) {
            console.log('Error en el perfil ', error)
        }

    }

    //dispatch(callProtectedApi)

    const [edicionPerfil, setEdicionPerfil] = useState(true)
    // const [bool, setBool] = useState(true);
    const [registro, setRegistro] = useState({
        // name: "",
        // last_name: "",
        // country: "",
        // wallet: "",
        // image: ""
    });

    //const [registro, setRegistro] = useState(user);

    const handleOnChange = (e) => {
        console.log('Me Inicio (registro)', registro)
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
        console.log('Me modifico (registro)', registro)
    }

    const handleEdition = () => {
        setEdicionPerfil(edicionPerfil => !edicionPerfil)

    }

    // const handleOnClick = () => {
    //     setBool(false)
    // }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        //console.log("submit", registro)

        const registro2 = {...user,
            name: `${registro.name !== '' ? registro.name : user.name}`,
            last_name: `${registro.last_name !== '' ? registro.last_name : user.last_name}`,
            country: `${registro.country !== '' ? registro.country : user.country}`,
            wallet: `${registro.wallet !== '' ? registro.wallet : user.wallet}`,
            image: `${registro.image !== '' ? registro.image : user.image}`
         }
        dispatch(editUser(user.id, registro2));
        console.log("Soy el Nuevo Registro", registro);
        handleEdition();
        // setRegistro(user);
    }

    let p = [];
    let d = [];
    let o = [];

    c.map(element => {
        if (element.status === "pending") {
            p.push(element);
        }
        if (element.status === "done") {
            d.push(element);
        }
        if (element.status === "otro") {
            o.push(element);
        }
        return (<></>)
    })

    // console.log("USER:::::::::::", user.image);
    // console.log('USERHOOK', userHook.image);



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
                                    <NavLink to="/detallecontratosfin"><h6>ver detalles</h6></NavLink>
                                </div>
                            )
                        }) : <></>}

                    </div>
                    <div className="contratos-borradores">
                        <h5>Borradores</h5>
                        {o ? o.map((element, index) => {
                            return (
                                <div key={index} className="info-contrato">
                                    <h6>{element.conditions.name}</h6>
                                    <h6>{element.conditions.amount}</h6>
                                    <NavLink to="/detallecontratosfin"><h6>ver detalles</h6></NavLink>
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
                                    <NavLink to="/detallecontratosfin"><h6>ver detalles</h6></NavLink>
                                </div>
                            )
                        }) : <></>}

                    </div>

                </div>

                <div className="area-perfil">

                    <div className="imageCircle">
                        {user.image ? <img className="imageCircle" src={user.image} alt="imagen de silueta" /> : <></>}





                        <input type="button" onClick={handleBtnClick} value="v/" />

                    </div>

                    <form onSubmit={formHandler}>
                        {/* <input className="avatarInput" type="file" ref={inputFileRef} onChange={(e) => { handelFileChange(e) }} /> */}
                        <input className="avatarInput" type="file" accept="image/png,image/jpeg" ref={inputFileRef} />
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

export default Profile
