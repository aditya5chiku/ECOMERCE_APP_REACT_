import { REGISTER_SUCCSESS, REGISTER_FAILURE, LOADER, SHOW, USER_LOADED, LOGIN_FAILURE, LOGIN_SUCCESS, HIDE } from './type'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken';



export const register = (name, email, password) => async (dispatch) => {
    const head = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(name, email, password);
    try {
        dispatch({ type: LOADER, payload: true });
        const res = await axios.post(`http://localhost:5000/api/reg`, body, head);
        dispatch({
            type: REGISTER_SUCCSESS, payload: res.data,
        });
        const msg = {
            message: "user register",
            code: "200"
        }

        dispatch({ type: SHOW, payload: msg })
        dispatch({ type: LOADER, payload: false });

    } catch (err) {
        console.log(err)

        dispatch({
            type: LOADER,
            payload: false,
        });
        dispatch({
            type: REGISTER_FAILURE,
        });

    }
};


export const login = (email, password) => async (dispatch) => {
    delete axios.defaults.headers.common["jwt"];

    const head = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(email, password);

    try {
        dispatch({ type: LOADER, payload: true });
        const res = await axios.post(`http://localhost:5000/api/log`, body, head);
        await dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        await dispatch(loadUser())
        const msg = { message: res.data.message, code: "200" }
        dispatch({ type: SHOW, payload: msg })
        dispatch({ type: LOADER, payload: false, });


    } catch (err) {
        dispatch({ type: LOADER, payload: false });
        const msg = { message: err.response?.data?.error, code: 400 }
        dispatch({ type: HIDE, payload: msg })
        dispatch({ type: LOGIN_FAILURE });
    }
};


export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem("jwt")) {
        setAuthToken(localStorage.getItem("jwt"));
    }
    dispatch({
        type: LOADER,
        payload: true,
    });
    try {
        const res = await axios.get(`http://localhost:5000/api/user`);
        console.log("userdetails", res.data);
        await dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        await dispatch({
            type: LOADER,
            payload: false,
        });
    } catch (err) {
        console.log(err);
    }
};



export const createProductCategory = (category_Id, category) => async (dispatch) => {
    console.log("ID", category_Id)
    const head = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post(`http://localhost:5000/api/category/create/${category_Id}`, category, head);
        console.log("LLL", res)
    } catch (error) {
        console.log(error)
    }

}