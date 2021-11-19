import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const POST_SING_UP = 'POST_SING_UP';
export const SEND_LOGIN = 'SEND_LOGIN';
export const GET_CONTRACT_BY_ID = 'GET_CONTRACT_BY_ID';
export const REMOVE_CONTRACT = 'REMOVE_CONTRACT'

export const sendLogin = (userLoginObject) => {
    // console.log('ACTION:::', userLoginObject);
    return {
        type: SEND_LOGIN,
        payload: userLoginObject
    }
}

export const postSingUp = (userRegisterObject) => {
    console.log('ACTION:::', userRegisterObject)
    return {
        type: POST_SING_UP,
        payload: userRegisterObject
    }
}

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

export const getContractsByID = (id) =>{
    return function (dispatch) {
        return axios.get(`http://localhost:3001/contract/${id}`)
        .then(response => dispatch ({
            type: GET_CONTRACT_BY_ID,
            payload: response.data
        }))
    }
}

export const removeContract = () => {
    return {
        type: REMOVE_CONTRACT,
        payload: {}
    }
}