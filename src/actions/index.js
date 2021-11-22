import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_CONTRACTS = 'GET_CONTRACTS';
export const POST_SING_UP = 'POST_SING_UP';
export const SEND_LOGIN = 'SEND_LOGIN';
export const GET_CONTRACT_BY_ID = 'GET_CONTRACT_BY_ID';
export const REMOVE_CONTRACT = 'REMOVE_CONTRACT'
export const CREATE_CONTRACT = 'CREATE_CONTRACT'

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
        .then(response => dispatch({
            type: SEND_LOGIN,
            payload: response.data
        }))
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
// export function createActivities(payload){
//     return async (dispatch)=>{
//         dispatch({
//             type: CREATE_ACTIVITIES,
//         });
//         await axios.post('http://localhost:3001/activities/add', payload)
//         .then((response)=>{
//             console.log("registrado correctamente");
//             console.log(response);
//         })
//     }

// }

export const getUsers = () => {
    return async dispatch => {
        return await axios.get("http://localhost:3001/user")
            .then(response => dispatch({
                type: GET_USERS,
                payload: response.data
            }))
    }
}

export const getContracts = () => {
    return async dispatch => {

        return await axios.get("http://scmkt.herokuapp.com/contract")
        .then(response => dispatch ({
            type: GET_CONTRACTS,
            payload: response.data
        }))
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