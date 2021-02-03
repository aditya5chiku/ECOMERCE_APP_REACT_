import { ADD_CATEGORY, START_LOADER, GET_CATEGORY, STOP_LOADER, CLEAR_COMPANY } from "../action/type";


const initialState = {
    loading: false,
    product_categories: []
}

export default function product(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_CATEGORY:
            return {
                ...state,

                loading: false
            };
        case GET_CATEGORY:
            return {
                ...state,
                company_categories: [...payload],
                loading: false
            }
        default:
            return state;
    }
}