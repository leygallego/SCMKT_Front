import { GET_CONTRACTS, GET_USERS, POST_SING_UP, SEND_LOGIN, GET_CONTRACT_BY_ID } from "../actions";


const initialState = {
    users: [],
    contracts: [],
    user: {},
    contract: {},
    verified: false
    
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
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
            if (
                action.payload.name === ""
                || action.payload.country === ""
                || action.payload.email === ""
                || action.payload.wallet === ""
                || action.payload.password === ""
            ) {
                return state;
            }
            return {
                ...state,
                newUser: [...state.newUser, action.payload]
            }
        case SEND_LOGIN:
            console.log('SEND_LOGIN:::::', action.payload)
            const { name, password } = action.payload;
            console.log('Destructurado', name, password)
            state.newUser.map(
                element => {
                    if (element.name === name && element.password === password) {
                        console.log('Si hay login', element.name, element.password);
                        return {
                            ...state,
                            user: {
                                name,
                                password
                            }
                        }

                    }
                    return null;
                }
            );
            return state;

        default: return state
    }
}
