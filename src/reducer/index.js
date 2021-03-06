import {
    GET_CONTRACTS,
    GET_USERS,
    GET_USER_BY_ID,
    POST_SING_UP,
    SEND_LOGIN,
    GET_CONTRACT_BY_ID,
    PREVIEW_CONTRACT,
    REMOVE_CONTRACT,
    EDIT_USER,
    UPDATE_CONTRACT,
    SET_CONTRACT_STATUS,
    SET_FILTER_DURATIONH,
    SET_FILTER_DURATIONL,
    SET_FILTER_CATEGORY,
    SET_FILTER_STATE,
    SET_FILTER_TYPE,
    SET_AUTHOR,
    SET_NAME,
    SET_PROFILE_IMAGE,
    SET_SPINNER,
    SET_CHAT,
    CHOOSED_USER,
    GET_MESSAGES,
    GET_USERS_DATABASE,
    SEND_MESSAGE,
    ERASE_MESSAGE,
    CONFIG_CHANNEL,
    SET_LOADING,
    GET_USER_SUSCRIBED,
    SET_FILTER_AMOUNT,
    SORT_CONTRACTS
} from "../actions";

const initialState = {
    users: [],
    contracts: [],
    user: {},
    userSuscribed: {},
    contract: {},
    preview: {},
    verified: false,
    profileImage: "",
    spinner: true,
    chat: false,
    choosed: {},
    loggedUser: {},
    messages: [],
    channel: "",
    isAuthenticated: false,
    loading: false,
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case SET_PROFILE_IMAGE:
            return {
                ...state,
                profileImage: action.payload
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload
            }

        case GET_USER_SUSCRIBED:
            return {
                ...state,
                userSuscribed: action.payload
            }

        case GET_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            }

        case SET_CONTRACT_STATUS:
            return {
                ...state,
                contract: {
                    ...state.contract,
                    status: action.payload.status,
                    clientID: action.payload.clientId
                }
            }

        case GET_CONTRACT_BY_ID:
            return {
                ...state,
                contract: action.payload
            }

        case UPDATE_CONTRACT:
            return {
                ...state,
                contract: action.payload
            }

        case PREVIEW_CONTRACT:
            return {
                ...state,
                preview: action.payload
            }

        case REMOVE_CONTRACT:
            return {
                ...state,
                contracts: action.payload
            }

        case POST_SING_UP:
            return {
                ...state
            }

        case SEND_LOGIN:
            return {
                ...state,
                user: action.payload.user,
                contracts: action.payload.contracts,
                loading: false
            };

        case EDIT_USER:
            return {
                ...state,
                user: action.payload
            };

        case SET_FILTER_DURATIONH:
            return {
                ...state,
                filterDurationH: action.payload
            }

        case SET_FILTER_DURATIONL:
            return {
                ...state,
                filterDurationL: action.payload
            }

        case SET_FILTER_CATEGORY:
            return {
                ...state,
                filterCategory: action.payload
            }

        case SET_FILTER_STATE:
            return {
                ...state,
                filterState: action.payload
            }

        case SET_FILTER_AMOUNT:
            return {
                ...state,
                filterAmount: action.payload
            }

        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: action.payload
            }

        case SET_AUTHOR:
            return {
                ...state,
                author: action.payload
            }

        case SET_NAME:
            return {
                ...state,
                name: action.payload
            }

        case SET_SPINNER:
            return {
                ...state,
                spinner: !state.spinner
            }

        case SET_CHAT:
            return {
                ...state,
                chat: action.payload
            }

        case GET_USERS_DATABASE:
            return {
                ...state,
                users: action.payload
            }

        case CHOOSED_USER:
            return {
                ...state,
                choosed: action.payload
            }

        case SEND_MESSAGE:
            return {
                ...state
            }

        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }

        case ERASE_MESSAGE:
            return {
                ...state,
                message: action.payload
            }

        case CONFIG_CHANNEL:
            console.log('CONFIG_CHANNEL::::', action.payload)
            return {
                ...state,
                channel: action.payload
            }

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case SORT_CONTRACTS:
            const orderType = action.payload;
            let order = (orderType === 'REC_ASC' || orderType === 'DUR_ASC') ? 1 : -1;

            if (orderType.slice(0, 3) === 'REC') {
                return {
                    ...state,
                    contracts: [...state.contracts].sort((a, b) => (((a['conditions']['amount'] === b['conditions']['amount']) && (a['conditions']['name'].toLowerCase() > b['conditions']['name'].toLowerCase())) || (a['conditions']['amount'] > b['conditions']['amount'])) ? order : order * (-1)),
                }
            } else {
                return {
                    ...state,
                    contracts: [...state.contracts].sort((a, b) => (((a['conditions']['duration'] === b['conditions']['duration']) && (a['conditions']['name'].toLowerCase() > b['conditions']['name'].toLowerCase())) || (a['conditions']['duration'] > b['conditions']['duration'])) ? order : order * (-1)),
                }
            }

        default: return state
    }
}
