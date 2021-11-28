import { 
    GET_CONTRACTS,
    GET_USERS,
    GET_USER_BY_ID,
    POST_SING_UP,
    SEND_LOGIN,
    GET_CONTRACT_BY_ID,
    EDIT_USER,
    SET_FILTER_DURATIONH,
    SET_FILTER_DURATIONL,
    SET_FILTER_CATEGORY,
    SET_FILTER_STATE,
    SET_FILTER_TYPE,
    SET_AUTHOR,
    SET_NAME,
    SET_PAGE
} from "../actions";

const initialState = {
    users: [],
    contracts: [],
    user: {},
    contract: {},
    verified: false,
    page: 1
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
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

        case GET_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            }

        case GET_CONTRACT_BY_ID:
            return {
                ...state,
                contract: action.payload
            }

        case POST_SING_UP:
            // console.log('POST_SING_UP', action.payload);
            // if (
            //     action.userRegisterObject.username === ""
            //     || action.userRegisterObject.country === ""
            //     || action.userRegisterObject.email === ""
            //     || action.userRegisterObject.wallet === ""
            //     || action.userRegisterObject.password === ""
            // ) {
            //     return state;
            // }
            // return {
            //     ...state,
            //     newUser: [...state.newUser, action.userRegisterObject]
            // }
            return{
                ...state
            }
        case SEND_LOGIN:
            //console.log('Este es el payload: ', action.payload)
            //console.log('SEND_LOGIN:::::', action.payload)
            //const { name, password } = action.payload;
            //console.log('Destructurado', name, password)
            // state.newUser.map(
            //     element => {
            //         if (element.name === name && element.password === password) {
            //             console.log('Si hay login', element.name, element.password);
            //             return {
            //                 ...state,
            //                 user: {
            //                     name,
            //                     password
            //                 }
            //             }

            //         }
            //         return null;
            //     }
            // );
            return {
                ...state,
                user: action.payload
            };

            //case EDIT_USER:
            //     return{
            //         ...state,
            //         user : action.payload
            //};

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

            case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }

        default: return state
    }
}
