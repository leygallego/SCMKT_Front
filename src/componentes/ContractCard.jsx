import React from 'react';
import './Contratos.css';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';



function ContractCard({ id, conditions }) {

    let { name, amount, shortdescription } = conditions
    // const userId = useSelector(state => state.user.id);
    // const contractUserId = useSelector(state => state.contracts); 
    // console.log(userId);



    // contractUserId ? contractUserId.map(element => {



    //     if (element.id === id) {
    //         console.log('ID DEL CONTRATO', element.id)
    //         console.log('ID DEL CARD', id)
    //        return console.log('estoy conectado con: ', element.owner.name);
    //     }
    //     // console.log('Element::::', element.owner.id)
    // }) : console.log('');



    return (
        <>
            <div className="contratos-card">

                <div className='wrapper'>
                    <NavLink to={`/detalle/${id ? id : "undefined"}`}>
                        <h2 className='ellipsis-contract-name'>{name ? name : "undefined"}</h2>
                        </NavLink>
                    <h1><span>{amount ? amount : "undefined"}</span> </h1>
                    <p>{shortdescription ? shortdescription : "undefined"}</p>
                </div>
            </div>
        </>
    )
}

export default ContractCard