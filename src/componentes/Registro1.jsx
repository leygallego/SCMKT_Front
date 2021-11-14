import React, { useState, useRef } from 'react';
import { Avatar } from '@material-ui/core';


import './styles/registro1.css';

const Registro1 = () => {
    const Countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
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


    const [bool, setBool] = useState(true);
    const [avatarImage, setAvatarImage] = useState("images/logo192.png");
    const inputFileRef = useRef();
    const handleBtnClick = () => {
        inputFileRef.current.click();
    }

    const handleOnClick = () => {
        setBool(false)
        console.log(bool);
    }
    const handelFileChange = (e) => {
        console.log('click Avatar cambia')
        let avatar = Object.entries(e.target.files);
        // console.log(avatar[0][1].name)
        setAvatarImage(`images/${avatar[0][1].name}`);

    }

    return (
        <div className='registro1Component'>
            <div className="twoButtonsComponent">
                <div className="circleText">
                    <div className="circleButton">1</div>
                    <div>Información básica</div>
                </div>
                <div className="circleText">
                    <div className="circleButton">2</div>
                    <div>Completa tu perfil</div>
                </div>
            </div>
            <div className="inputsPlace">
                <div>
                    <form>
                        <input className="avatarInput" type="file" ref={inputFileRef} onChange={(e) => { handelFileChange(e) }} />
                        {/* <button onClick={handleBtnClick}>Select file</button> */}
                        <Avatar alt="Remy Sharp" src={avatarImage} className="avatar" onClick={handleBtnClick} />

                    </form>
                    {/* <input className="avatarInput" type='file' id="avatar" name="avatar"
       accept="image/png, image/jpeg" /> */}
                </div>

                <div><p>Crea tu cuenta para empezar a ver los contaratos disponibles</p></div>
                {bool ? <div className="registro1">
                    <div className="labelInput">
                        <div className="labelForm">Nombre completo</div>
                        <div className="inputForm"><input className="inputFormComponent" type="text" /></div>
                    </div>
                    <div className="labelInput">
                        <div className="labelForm">País de residencia</div>
                        <div>
                            <select className="inputFormComponent">
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
                        <div className="labelForm">Correo electrónico</div>
                        <div className="inputForm"><input className="inputFormComponent" type="email" /></div>
                    </div>
                    <div className="buttonFormComponent"><input className="buttonComponent" type="button" value="Next" onClick={handleOnClick} /></div>
                </div>
                    : <div className="registro2">
                        <div className="labelInput">
                            <div className="labelForm">Wallet address</div>
                            <div className="inputForm"><input className="inputFormComponent" type="text" /></div>
                        </div>
                        <div className="labelInput">
                            <div className="labelForm">Password</div>
                            <div className="inputForm"><input className="inputFormComponent" type="password" /></div>

                        </div>
                        <div className="labelInput">
                            <div className="labelForm">Confirm your password</div>
                            <div className="inputForm"><input className="inputFormComponent" type="password" /></div>
                        </div>
                        <div className="buttonFormComponent"><input className="buttonComponent" type="button" value="Send" /></div>
                    </div>}

            </div>

        </div>
    );
}

export default Registro1;
