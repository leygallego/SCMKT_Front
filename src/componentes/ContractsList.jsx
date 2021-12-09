import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContractsCard from './ContractsCard';
import { deleteContract } from '../actions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
// import './styles/contractscard.css';

const ContractsList = (props) => {
    const { contratos } = props

    const dispatch = useDispatch();
    const contracts = useSelector(state => state.contracts)

    const [eraser, setEraser] = useState([]);

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

    return (
        <div className='contractsCardComponent'>
            <div className="contratos-publicados">
                <h5>Contratos Publicados</h5>
                <div className='scrolling'>
                    {contracts ? contracts.map((element, index) => {
                        return (
                            (element.status === "published" || element.status === "taken")
                                ? <ContractsCard
                                    key={index}
                                    name={element.conditions.name}
                                    amount={element.conditions.amount}
                                    id={element.id}
                                    check={false}
                                />
                                : <></>
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
                    {contratos ? contratos.map((element, index) => {
                        return (
                            (element.status === "unpublished")
                                ? <ContractsCard
                                    key={index}
                                    name={element.conditions.name}
                                    amount={element.conditions.amount}
                                    id={element.id}
                                    check={true}
                                    onCheck={onCheck}
                                />
                                : <></>
                        )
                    }) : <></>}
                </div>

            </div>

            <div className="contratos-finalizados">
                <h5>Contratos Finalizados</h5>
                {contratos ? contratos.map((element, index) => {
                    return (
                        (element.status === "complete")
                            ? <ContractsCard
                                key={index}
                                name={element.conditions.name}
                                amount={element.conditions.amount}
                                id={element.id}
                                check={false}
                            />
                            : <></>
                    )
                }) : <></>}
            </div>
        </div>
    );
}

export default ContractsList;
