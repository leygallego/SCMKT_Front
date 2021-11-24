import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const POST_SING_UP = 'POST_SING_UP';
export const SEND_LOGIN = 'SEND_LOGIN';
export const GET_CONTRACT_BY_ID = 'GET_CONTRACT_BY_ID';
export const REMOVE_CONTRACT = 'REMOVE_CONTRACT'
export const CREATE_CONTRACT = 'CREATE_CONTRACT'
export const EDIT_USER = 'EDIT_USER'
export const SET_PAGE = 'SET_PAGE'

export const sendLogin = (userLoginObject) => {
    console.log('ACTION:::', userLoginObject);
    return async dispatch => {
        return await axios.get('https://scmkt.herokuapp.com/user/login', {
            headers: {
                authorization: `Bearer ${userLoginObject}`
            },
            body: {
                data: 12345
            }
        })
        .then(response => {
            dispatch({
            type: SEND_LOGIN,
            payload: response.data
            })
        })
    }
}

export const postSingUp = (userRegisterObject) => {
    console.log('ACTION:::', userRegisterObject)
    return async(dispatch) =>{
        dispatch({
            type:POST_SING_UP
        });
        await axios.put('https://scmkt.herokuapp.com/user/newuser', userRegisterObject)
        .then((response)=>{
            console.log("registrado correctamente", response);
        })
        .catch(error => {
            console.log("No se registró" , error);
        })
    }
    
}


export const getUsers = () => {
    return async dispatch => {
        return await axios.get("http://localhost:3001/user")
            .then(response => dispatch({
                type: GET_USERS,
                payload: response.data
            }))
    }
}

export const getUserByID = (id) =>{
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,7}')
    if(id === regex){
        id = axios.get(`https://scmkt.herokuapp.com/user/auth/${id}`)
    }
    return async dispatch => {
        return await axios.get(`https://scmkt.herokuapp.com/user/${id}`)
        .then(response => dispatch ({
            type: GET_USER_BY_ID,
            payload: response.data
        }))
    }
}

/* 

export function getCountries({ page, orderByName, orderByPop, filterByAct, name }){
    return async (dispatch)=>{
      try {
        const response = await axios.get(`http://localhost:3001/countries?page=${page ? page : 1}&orderByName=${orderByName ? orderByName : ""}&orderByPop=${orderByPop ? orderByPop : ""}&filterByAct=${filterByAct ? filterByAct : ""}&name=${name ? name : ""}`)
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: response.data
        })
        } catch (error) {
            console.log(error);
        }
    }
}

*/


export function getContracts ({ page, name, author, filterType, filterCategory, filterDurationH, filterDurationL, filterState }) {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://scmkt.herokuapp.com/contract?page=${page ? page : 1}&name=${name ? name : ''}&author=${author ? author : ''}&filterType=${filterType ? filterType : ''}&filterCategory=${filterCategory ? filterCategory : ''}&filterDurationH=${filterDurationH ? filterDurationH : ''}&filterDurationL=${filterDurationL ? filterDurationL : ''}&filterState=${filterState ? filterState : ''}`)
            return dispatch({
                type: GET_CONTRACTS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getContractsByID = (id) =>{
    return async dispatch => {
        return await axios.get(`https://scmkt.herokuapp.com/contract/${id}`)
        .then(response => dispatch ({
            type: GET_CONTRACT_BY_ID,
            payload: response.data
        }))
    }
}

export function createContract(contract){
    return (dispatch) => {
      try {
        axios.put(`https://scmkt.herokuapp.com/contract/new`, contract)
            .then(() => {
                return dispatch({
                    type: CREATE_CONTRACT
                })
            })
      } catch (error) {
        console.log(error)
    }
  }
}

export const removeContract = () => {
    return {
        type: REMOVE_CONTRACT,
        payload: {}
    }
}

export const editUser = (id, user) => {
    console.log('ACTION EDIT USER:::', id)
    return async(dispatch) =>{
        dispatch({
            type:EDIT_USER
        });
        await axios.put(`https://scmkt.herokuapp.com/user/edit/${id}`, user)
        .then((response)=>{
            console.log("registrado correctamente", response);
        })
        .catch(error => {
            console.log("No se registró" , error);
        })
    }
    
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page
    }
  }