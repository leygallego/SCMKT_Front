import axios from 'axios';

export const GET_USERS = 'GET_USERS'
export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export const GET_CONTRACTS = 'GET_CONTRACTS'
export const POST_SING_UP = 'POST_SING_UP'
export const SEND_LOGIN = 'SEND_LOGIN'
export const EDIT_USER = 'EDIT_USER'
export const GET_CONTRACT_BY_ID = 'GET_CONTRACT_BY_ID'
export const REMOVE_CONTRACT = 'REMOVE_CONTRACT'
export const CREATE_CONTRACT = 'CREATE_CONTRACT'
export const SET_FILTER_DURATIONH = 'SET_FILTER_DURATIONH'
export const SET_FILTER_DURATIONL = 'SET_FILTER_DURATIONL'
export const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY'
export const SET_FILTER_STATE = 'SET_FILTER_STATE'
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_AUTHOR = 'SET_AUTHOR'
export const SET_NAME = 'SET_NAME'
export const SET_PAGE = 'SET_PAGE'
export const STOP_USER = 'STOP_USER'


export const sendLogin = (userLoginObject) => {
    //console.log('ACTION:::', userLoginObject);
    return async dispatch => {
        try {
            if (window.sessionStorage.getItem('user') === null) {
                const response = await axios.get('https://scmkt.herokuapp.com/user/login', {
                    headers: {
                        authorization: `Bearer ${userLoginObject}`
                    },
                    body: {
                        data: 12345
                        }
                    });
                window.sessionStorage.setItem('user', JSON.stringify(response.data));
            }
            return window.sessionStorage.getItem('user')
            .then(response => {
                dispatch({
                type: SEND_LOGIN,
                payload: JSON.parse(response.data)
                })
            }) 
        } catch(error) {
            console.log('Error en la action ',error)
        }
        
    }
}

export const postSingUp = (userRegisterObject) => {
    //console.log('ACTION:::', userRegisterObject)
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
        axios.post(`https://scmkt.herokuapp.com/contract/new`, contract)
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

export const setName = (name) => {
    return {
        type: SET_NAME,
        payload: name
    }
}

export const setFilterType = (filterType) => {
    return {
        type: SET_FILTER_TYPE,
        payload: filterType
    }
}

export const setFilterCategory = (filterCategory) => {
    return {
        type: SET_FILTER_CATEGORY,
        payload: filterCategory
    }
}

export const setFilterDurationH = (filterDurationH) => {
    return {
        type: SET_FILTER_DURATIONH,
        payload: filterDurationH
    }
}

export const setFilterDurationL = (filterDurationL) => {
    return {
        type: SET_FILTER_DURATIONL,
        payload: filterDurationL
    }
}

export const setFilterState = (filterState) => {
    return {
        type: SET_FILTER_STATE,
        payload: filterState
    }
}

export const setAuthor = (author) => {
    return {
        type: SET_AUTHOR,
        payload: author
    }
}

export const stopUser = () => {
    return {
        type: STOP_USER,
        payload: {}
    }
  }