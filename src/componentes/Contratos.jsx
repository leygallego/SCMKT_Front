import React, { useEffect, useState } from 'react';
import './Contratos.css';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { NavLink } from 'react-router-dom';
import { getContracts, sendLogin, setChat, configChannel, eraseMessage } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import ContractCard from './ContractCard'
import SearchBar from './SearchBar';
import { useAuth0 } from '@auth0/auth0-react'
import usePagination from './usePagination';

function Contratos() {
    const { user } = useSelector(state => state)
    let dispatch = useDispatch()
    const { contracts } = useSelector(state => state)
    const { isAuthenticated, getAccessTokenSilently, loginWithPopup } = useAuth0()

    useEffect(() => {
        dispatch(callProtectedApi)
        dispatch(setChat(false));
        // dispatch(configChannel(""));
        dispatch(eraseMessage([]));
    }, [dispatch])

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            await (dispatch(sendLogin(token)))
            dispatch(getContracts({ ownerId: user.id, typeC: 'all' }))
        } catch (error) {
            console.log('Error en el perfil ', error)
        }
    }

    let [page, setPage] = useState(1);
    const PER_PAGE = 12;
    const count = contracts ? Math.ceil(contracts.length / PER_PAGE) : 0;
    const _DATA = usePagination(contracts ? contracts : [], PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
        console.log('_DATA', _DATA.currentData())
    };

    return (
        <>
            <div>
                <div>
                    <SearchBar />
                </div>
                {
                    isAuthenticated ?
                        (
                            <div className="crea-contrato">
                                <NavLink to="/creacontrato"><Button variant="contained">Crear Contrato</Button></NavLink>
                            </div>
                        )
                        : (
                            <div className="crea-contrato">
                                <Button variant="contained" onClick={loginWithPopup}>Crear Contrato</Button>
                            </div>
                        )
                }
            </div>
            <div className='pagination-style'>
                <Pagination
                    count={count}
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChange}
                />
            </div>
            <div className="main-contratos">
                {
                    _DATA.currentData().length > 0 && _DATA.currentData().map((c) => {
                        return <ContractCard key={c.id} id={c.id} conditions={c.conditions} owner={c.owner} />
                    })
                }
            </div>
            <div className='pagination-style'>
                <Pagination
                    count={count}
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

export default Contratos
