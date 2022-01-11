import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearChcontractsButton = () => {
    return <div className="button-container">
        <NavLink to="/contratos"><Button
            className="busca-contratos"
            variant="contained"
            startIcon={<SearchIcon />}
        >Buscar Contratos</Button></NavLink>
    </div>
}

export default SearChcontractsButton;
