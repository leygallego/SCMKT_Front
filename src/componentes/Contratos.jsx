import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { NavLink } from 'react-router-dom';
import { getContracts, setChat, eraseMessage, setLoading, sendLogin } from "../actions";
import { useDispatch, useSelector } from 'react-redux';
import ContractCard from './ContractCard';
import SearchBar from './SearchBar';
import usePagination from './usePagination';
import Loader from './Loader';

import './styles/Contratos.css';
import { useAuth0 } from '@auth0/auth0-react';

function Contratos() {
    const { user, loading } = useSelector(state => state);
    const { contracts } = useSelector(state => state);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        if (!user.email) {
            dispatch(callProtectedApi)
        }
        dispatch(setChat(false));
        dispatch(eraseMessage([]));
        dispatch(getContracts({ ownerId: user.id, typeC: 'all' }));
        dispatch(setLoading(false));
    }, [dispatch, user.id])

    const {
        getAccessTokenSilently,
    } = useAuth0();

    async function callProtectedApi() {
        const token = await getAccessTokenSilently();

        try {
            await dispatch(sendLogin(token))
        } catch (error) {
            console.log('Error en el perfil ', error)
        }
    }

    let [page, setPage] = useState(1);
    const PER_PAGE = 8;
    const count = contracts ? Math.ceil(contracts.length / PER_PAGE) : 0;
    const _DATA = usePagination(contracts ? contracts : [], PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div className='container-contratos'>
            <div className='contratos-wraper'>
                <div>
                    <SearchBar />
                </div>
                <div className="crea-contrato">
                    <NavLink to="/creacontrato" className="crea-contrato"><Button className="crea-contrato" variant="contained">Crear Contrato</Button></NavLink>
                </div>
            </div>
            <div className='pagination-style'>
                <Pagination
                    count={count}
                    size="small"
                    // variant="outlined"
                    shape="rounded"
                    page={page}
                    className={'pagination-estilo'}
                    onChange={handleChange}
                    color='standard'
                />
            </div>
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
        </div>
    )
}

export default Contratos
