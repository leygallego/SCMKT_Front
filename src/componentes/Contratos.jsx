import React, { useEffect, useState } from 'react';
import './Contratos.css';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { NavLink } from 'react-router-dom';
import { getContracts, setPage } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import ContractCard from './ContractCard'
import SearchBar from './SearchBar';
import { useAuth0 } from '@auth0/auth0-react'
import usePagination from './usePagination';

function Contratos() {
    const { user } = useSelector(state => state)
    let dispatch = useDispatch()
    const { contracts, name, author, filterType, filterCategory, filterDurationH, filterDurationL, filterState } = useSelector(state => state)
    const { isAuthenticated, /*loginWithRedirect*/ loginWithPopup } = useAuth0()

    // console.log('Contratos', contracts)

    useEffect(() => {
        // dispatch(getContracts({ filterState: 'pending' }))
        dispatch(getContracts({ownerId: user.id}))
    }, [dispatch])

    // const changePage = (page) => {
    //     dispatch(getContracts({ page, name, author, filterType, filterCategory, filterDurationH, filterDurationL, filterState }))
    //     dispatch(setPage(page))
    // }

    let [page, setPage] = useState(1);
    const PER_PAGE = 12;
    const count = contracts? Math.ceil(contracts.length / PER_PAGE) : 0;
    const _DATA = usePagination(contracts? contracts : [], PER_PAGE);

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
                        return <ContractCard key={c.id} id={c.id} conditions={c.conditions} />
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
            {/* <button disabled={page - 1 === 0} onClick={() => { changePage(page - 1) }}>prev</button>
            <label>{page}</label>
            <button disabled={contracts?.count <= (page * 10)} onClick={() => { changePage(page + 1) }}>next</button> */}
        </>
    )
}

export default Contratos
