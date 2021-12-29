import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContractsCard from './ContractsCard';
import { deleteContract, getContracts, setChat } from '../actions';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const ContractsList = (props) => {
    const { contratos } = props

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const contracts = useSelector(state => state.contracts)

    const [eraser, setEraser] = useState([]);

    useEffect(() => {
        // dispatch(callProtectedApi)
        dispatch(getContracts({ ownerId: user.id, typeC: 'owner' }))
    }, [dispatch])

    const borraContratos = () => {
        Swal.fire({
            title: `¿Está seguro de eliminar ${eraser.length} contrato(s)?`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (eraser.length > 0) {
                    let resto = contracts.filter(element => !eraser.includes(element.id))
                    dispatch(deleteContract({ contract: eraser, resto }));
                    setEraser([])
                    dispatch(getContracts({ ownerId: user.id, typeC: 'owner' }))
                }
                Swal.fire(`${eraser.length} contrato(s) ha(n) sido borrado(s)`, '', 'success')
            } //else if (result.isDenied) {
            //  Swal.fire('Changes are not saved', '', 'info')
            // }
        })
    }

    const onCheck = (e) => {
        let er = eraser;
        if (e.target.checked) {
            er.push(e.target.name)
        } else {
            er = er.filter(element => element != e.target.name)
        }
        setEraser(er)
    }
    
    return (
        <div className='contractsCardComponent'>
            <div className="contratos-publicados">
                <h5>Contratos Publicados</h5>
                <div className='scrolling'>
                    {contracts ? contracts.map((element, index) => {
                        return (
                            <div key={`${index}-list-1`}>
                                {(element.status === "published" || element.status === "taken")
                                    ? <ContractsCard
                                        key={`${index}-list`}
                                        name={element.conditions.name}
                                        amount={element.conditions.amount}
                                        id={element.id}
                                        image={element.image}
                                        check={false}
                                        chat={false}
                                    />
                                    : <></>}
                            </div>)
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
                    {contracts ? contracts.map((element, index) => {
                        return (
                            <div key={`${index}-list-2`}>
                                {
                                    (element.status === "unpublished")
                                        ? <ContractsCard
                                            key={`${index}-list-unpub`}
                                            name={element.conditions.name}
                                            amount={element.conditions.amount}
                                            id={element.id}
                                            check={true}
                                            onCheck={onCheck}
                                        />
                                        : <></>
                                }
                            </div>
                        )
                    }) : <></>}
                </div>
            </div>

            <div className="contratos-finalizados">
                <h5>Contratos Finalizados</h5>
                {contracts ? contracts.map((element, index) => {
                    return (
                        <div key={`${index}-list-3`}>
                            {
                                (element.status === "complete")
                                    ? <ContractsCard
                                        key={`${index}-list-comp`}
                                        name={element.conditions.name}
                                        amount={element.conditions.amount}
                                        id={element.id}
                                        check={false}
                                    />
                                    : <></>
                            }
                        </div>
                    )
                }) : <></>}
            </div>
        </div>
    );
}

export default ContractsList;
