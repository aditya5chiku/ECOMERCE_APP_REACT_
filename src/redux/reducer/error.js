import { SHOW, HIDE } from '../action/type'

const inititalStates = {
    loading: false,
    message: "",
    successCode: ""
}

function error(state = inititalStates, action) {
    const { type, payload } = action
    switch (type) {
        case SHOW:
            return {
                loading: true,
                message: payload.message,
                code: payload.code
            }
        case HIDE:
            return {
                ...inititalStates,
                loading: false
            }
        default:
            return state
    }
}
export default error