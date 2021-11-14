import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const POST_SING_UP = 'POST_SING_UP';
export const SEND_LOGIN = 'SEND_LOGIN';

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