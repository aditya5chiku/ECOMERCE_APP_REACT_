import { HIDE, STOP_LOAD } from '../action/type'


export const resetAll = () => dispatch => {
    dispatch({ type: HIDE })
    dispatch({ type: STOP_LOAD })
}