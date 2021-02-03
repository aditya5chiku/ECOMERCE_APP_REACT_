import {
    REGISTER_SUCCSESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOADED
} from '../action/type'

const initialState = {
    token: localStorage.getItem('jwt'),
    isAuthenticated: false,
    user: null,
    loading: false,
}



export default function auth(state = initialState, action) {
    const { type, payload } = action;
    console.log("TYPE", type, payload)
    if (type === USER_LOADED) console.log("unique", payload.user.role)
    switch (type) {

        case USER_LOADED:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        case REGISTER_SUCCSESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                ...payload,
                user: null,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('jwt', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        default:
            return state;
    }
}