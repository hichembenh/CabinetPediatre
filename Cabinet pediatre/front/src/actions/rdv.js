import {FETCH_RDV, DELETE_RDV, UPDATE_RDV, CREATE_RDV} from "../constants/actionTypes";
import * as api from '../api/index.js';

export const getRdvs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchRdv();

        dispatch({ type: FETCH_RDV, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createRdv = (rdv) => async (dispatch)=>{

    try {
        const {data} = await api.createRdv(rdv)
        console.log(rdv)
        dispatch({ type: CREATE_RDV, payload: data });
    } catch (e){
        console.log(e.message)
        console.log('create error')
    }
}