import React, { useEffect, useState } from 'react';
import './Contratos.css';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { NavLink } from 'react-router-dom';
import { getContracts, sendLogin, setChat, configChannel, eraseMessage, setLoading } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import ContractCard from './ContractCard'
import SearchBar from './SearchBar';
import { useAuth0 } from '@auth0/auth0-react'
import usePagination from './usePagination';
import Loader from './Loader';

function Contratos() {
    const { user, loading } = useSelector(state => state)
    let dispatch = useDispatch()
    const { contracts } = useSelector(state => state)
    const { isAuthenticated, getAccessTokenSilently, loginWithPopup } = useAuth0()

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(callProtectedApi)
        dispatch(setChat(false));
        dispatch(eraseMessage([]));
        // dispatch(setLoading(false))
    }, [dispatch])

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();
        try {
            await (dispatch(sendLogin(token)))
            dispatch(getContracts({ ownerId: user.id, typeC: 'all' }))
            dispatch(setLoading(false))
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
            <div className='contratos-wraper'>
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
            {/* <div className='pagination-style'>
                <Pagination
                    count={count}
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChange}
                />
            </div> */}

            {loading
                ? <Loader />
                :
                <div className="main-contratos">
                    {_DATA.currentData().length > 0 && _DATA.currentData().map((c) => {
                        return <ContractCard key={c.id} id={c.id} conditions={c.conditions} />
                    })
                    }
                </div>
            }

            <div className='pagination-style'>
                <Pagination
                    count={count}
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    className={'pagination-style'}
                    onChange={handleChange}
                />
            </div>
            {/* <button disabled={page - 1 === 0} onClick={() => { changePage(page - 1) }}>prev</button>
            <label>{page}</label>
            <button disabled={contracts?.count <= (page * 10)} onClick={() => { changePage(page + 1) }}>next</button> */}
        </>
    )
}

export default Contratos
