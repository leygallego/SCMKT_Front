import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_CONTRACTS = 'GET_CONTRACTS'


export const getUsers = ()=>{
    return async dispatch => {
        return await axios.get("http://localhost:3001/user")
        .then(response => dispatch ({
            type: GET_USERS,
            payload: response.data
        }))
    }
}

export const getContracts = ()=>{
    return async dispatch => {
        return await axios.get("http://localhost:3001/user")
        .then(response => dispatch ({
            type: GET_CONTRACTS,
            payload: response.data
        }))
    }
}