import axios from 'axios';
import '../firebase';
import { getDatabase, ref, onValue, set, push, get, child } from 'firebase/database';
import { NODE_ENV, urlProduction1, urlProduction, urlDevelop, port1 } from '../config/app.config.js';
import { Octokit } from 'octokit';
//import {createOAuthAppAuth} from '@octokit/auth-oauth-app';
const { createOAuthAppAuth } = require('@octokit/auth-oauth-app');


export const GET_USERS = 'GET_USERS'
export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export const GET_CONTRACTS = 'GET_CONTRACTS'
export const POST_SING_UP = 'POST_SING_UP'
export const SEND_LOGIN = 'SEND_LOGIN'
export const EDIT_USER = 'EDIT_USER'
export const SET_CONTRACT = 'SET_CONTRACT'
export const GET_CONTRACT_BY_ID = 'GET_CONTRACT_BY_ID'
export const SET_CONTRACT_STATUS = 'SET_CONTRACT_STATUS'
export const UPDATE_CONTRACT = 'UPDATE_CONTRACT'
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
export const PREVIEW_CONTRACT = 'PREVIEW_CONTRACT'
export const STOP_USER = 'STOP_USER'
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';
export const SET_SPINNER = 'SET_SPINNER';
export const SET_CHAT = 'SET_CHAT';
export const GET_USERS_DATABASE = 'GET_USERS_DATABASE';
export const CHOOSED_USER = 'CHOOSED_USER';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const ERASE_MESSAGE = 'ERASE_MESSAGE';
export const SET_CHANNEL = 'SET_CHANNEL';
export const CONFIG_CHANNEL = 'CONFIG_CHANNEL';
export const SEARCH_CHANNEL = 'SEARCH_CHANNEL';
export const RETURN_NULL = 'RETURN_NULL';
export const SET_LOADING = 'SET_LOADING';

const database = getDatabase();

let chatUser = "";
// const urlWork = NODE_ENV === 'production1' ? urlProduction1 : `${urlDevelop}:${port1}` // Front de localhost 
const urlWork = NODE_ENV === 'production' ? urlProduction1 : `${urlDevelop}:${port1}` // Deployy

export const configChannel = (channelId) => {
    return {
        type: CONFIG_CHANNEL,
        payload: channelId
    }
}

let id22 = "";
export const searchChannel = (channel) => {
    const { id1 } = channel;
    return async (dispatch) => {
        const dbRef = ref(getDatabase());
        await get(child(dbRef, "smartChatChannels"))
            .then((snapshot) => {
                const validate = snapshot.val();
                let bool = false;
                let bool2 = false;
                if (validate === null) {
                    channel.id2 = id22;
                    dispatch(setChannel(channel))
                }
                Object.keys(snapshot.val()).map(key => {
                    const value = snapshot.val()[key];
                    if (!bool) {
                        if (
                            id1 === value.channel.id1 && id22 === value.channel.id2
                            || id22 === value.channel.id1 && id1 === value.channel.id2
                        ) {
                            bool = true;
                            bool2 = true;
                            dispatch(configChannel(key));
                        }
                    }
                });
                if (!bool2) {
                    channel.id2 = id22;
                    dispatch(setChannel(channel))
                }
            })
    }
}

/*
export const createrepo = (user, token, name) => {
    const octokit = new Octokit({
        authStrategy: createOAuthAppAuth,
        auth: token,
      });
    
    try{
        return async (dispatch) => {
            await octokit.request(`POST /${user}/repos`, {
                name: name,
              })
            }

    }catch(e){console.log(e)}
    
    
}
*/

export const setChannel = (channel) => {
    return (dispatch) => {
        const db = getDatabase();
        const list = ref(db, 'smartChatChannels');
        const newItem = push(list);
        set(newItem, {
            channel
        })
            .then(async () => {
                const dbRef = ref(getDatabase());
                await get(child(dbRef, "smartChatChannels"))
                    .then((snapshot) => {
                        Object.keys(snapshot.val()).map(key => {
                            const value = snapshot.val()[key];
                            if (
                                channel.id1 === value.channel.id1 && channel.id2 === value.channel.id2
                                || channel.id22 === value.channel.id1 && channel.id1 === value.channel.id2
                            ) {
                                dispatch(configChannel(key));
                            }
                        });
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const choosedUser = (chatUser) => {
    return {
        type: CHOOSED_USER,
        payload: chatUser
    }
}

export const getMessages = (id) => {

    return (dispatch) => {
        onValue(ref(database, `/smartChat/${id}/chat/`), (snapshot) => {
            dispatch({
                type: GET_MESSAGES,
                payload: snapshot.val()
            })
        })
    }
}

export const eraseMessage = (obj) => {
    return {
        type: ERASE_MESSAGE,
        payload: obj
    }
}

export const sendMessage = (message) => {
    const date = new Date();
    return () => {
        const db = getDatabase();
        set(ref(db, `smartChat/${message.channelId}/chat/${date}`), {
            message
        })
            .then(() => {
                return {
                    type: GET_USERS_DATABASE
                }
            })
            .catch(error => {
                console.log(error)
            })

    };
}

export const setChat = (bool) => {
    return {
        type: SET_CHAT,
        payload: bool
    }
}

export const setSpinner = () => {
    return {
        type: SET_SPINNER
    }
}

export const setProfileImage = (url) => {
    return {
        type: SET_PROFILE_IMAGE,
        payload: url
    }
}

export const sendLogin = (userLoginObject) => {
    return async dispatch => {
        try {
            window.sessionStorage.setItem('token', userLoginObject);
            const response = await axios.get(`${urlWork}/user/login`, {
                headers: {
                    authorization: `Bearer ${userLoginObject}`
                },
                body: {
                    data: 12345
                }
            });

            const contractsResponse = await axios.get(`${urlWork}/contract?ownerId=${response.data.id}&typeC='owner'`)
            chatUser = response.data.id;

            return dispatch({
                type: SEND_LOGIN,
                payload: { user: response.data, contracts: contractsResponse.data }
            })
        } catch (error) {
            console.log('Error en la action ', error)
        }
    }
}


export const postSingUp = (userRegisterObject) => {
    return async (dispatch) => {
        dispatch({
            type: POST_SING_UP
        });
        await axios.put(`${urlWork}/user/newuser`, userRegisterObject)
            .then((response) => {
                console.log("registrado correctamente", response);
            })
            .catch(error => {
                console.log("No se registró", error);
            })
    }

}


export const getUsers = () => {
    return async dispatch => {
        return await axios.get(`${urlWork}/user`)
            .then(response => dispatch({
                type: GET_USERS,
                payload: response.data
            }))
    }
}

export const getUserByID = (id) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,7}')
    if (id === regex) {
        id = axios.get(`${urlWork}/user/auth/${id}`)
    }
    return async dispatch => {
        return await axios.get(`${urlWork}/user/${id}`)
            .then(response => dispatch({
                type: GET_USER_BY_ID,
                payload: response.data
            }))
    }
}

export function getContracts({ name, author, ownerId, typeC, filterType, filterCategory, filterDurationH, filterDurationL, filterState }) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${urlWork}/contract?name=${name ? name : ''}&author=${author ? author : ''}&ownerId=${ownerId ? ownerId : ''}&typeC=${typeC ? typeC : ''}&filterType=${filterType ? filterType : ''}&filterCategory=${filterCategory ? filterCategory : ''}&filterDurationH=${filterDurationH ? filterDurationH : ''}&filterDurationL=${filterDurationL ? filterDurationL : ''}&filterState=${filterState ? filterState : ''}`)
            return dispatch({
                type: GET_CONTRACTS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getContractsByID = (id) => {
    let responseChat = {};
    return async dispatch => {
        return await axios.get(`${urlWork}/contract/${id}`)
            .then(response => {
                responseChat = response.data;
                id22 = response.data.owner.id;
                dispatch({
                    type: GET_CONTRACT_BY_ID,
                    payload: response.data
                })
            })
            // .thens añadidos para el chat
            .then(() => {
                dispatch(choosedUser(
                    {
                        "name": responseChat.owner.name,
                        "id": responseChat.owner.id,
                        "image": responseChat.owner.image
                    },
                ));
            })
            .then(() => {
                dispatch(searchChannel(
                    {
                        "id1": chatUser
                    }
                ))
            })
    }
}

export function createContract(contract) {
    return (dispatch) => {
        try {
            axios.put(`${urlWork}/contract/new`, contract)
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

export function deleteContract({ contract, resto }) {
    return (dispatch) => {
        try {
            axios.put(`${urlWork}/contract/delete`, { contract })
                .then(() => {
                    return dispatch({
                        type: REMOVE_CONTRACT,
                        payload: resto
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getContractsPreview = (data) => {
    return {
        type: PREVIEW_CONTRACT,
        payload: data
    }
}

export const removeContract = (borrar) => {

    return {
        type: REMOVE_CONTRACT,
        payload: borrar
    }
}

export const editUser = (id, user) => {
    return async (dispatch) => {
        dispatch({
            type: EDIT_USER,
            payload: user
        });
        await window.sessionStorage.setItem('user', JSON.stringify(user));
        await axios.put(`${urlWork}/user/edit/${id}`, user)
            .then((response) => {
                // console.log("registrado correctamente", response);
            })
            .catch(error => {
                console.log("No se registró", error);
            })
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

export const updateContract = (contract) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_CONTRACT,
            payload: contract
        });
        await window.sessionStorage.setItem('user', JSON.stringify(contract.ownerId.id))
        
        await axios.put(`${urlWork}/contract/edit/${contract.id}`, contract)
            .then(() => {
                // console.log("registrado correctamente", response);
            })
            .catch(error => {
                console.log("No se pudo actualizar el estado del contrato", error);
            })
    }
}

export const changeStatusContract = (id, status, user) => {
    return async (dispatch) => {
        dispatch({
            type: SET_CONTRACT_STATUS,
            payload: { status, clientId: user }
        });
        await window.sessionStorage.setItem('user', JSON.stringify(user));
        await axios.put(`${urlWork}/contract/edit/status/${id}`, { status: status, clientId: user })
            .then(() => {
                // console.log("registrado correctamente", response);
            })
            .catch(error => {
                console.log("No se pudo actualizar el estado del contrato", error);
            })
    }

}

export const setLoading = (payload) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: SET_LOADING,
                payload
            })
        }, 0);
    }
}
