import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import auth from './auth'
import loader from './loader'
import error from './error'
import product from "./product"

const persistConfig = {
    key: 'root-app',
    storage
}

const rootReducer = combineReducers({
    auth,
    loader,
    error,
    product
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;