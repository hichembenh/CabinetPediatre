import {FETCH_RDV, DELETE_RDV, CREATE_RDV, DELETE_KID} from "../constants/actionTypes";
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

export const getMyRdvs = (id) => async (dispatch)=>{
    try{
        const {data} = await api.fetchMyRdvs(id)
        dispatch({ type: FETCH_RDV, payload: data });
    }catch (error){
        console.log(error.message)
        console.log('fetching my rdv fail')
    }

}

export const deleteRdv = (id) => async (dispatch) => {
    try {
        await api.deleteRdv(id);
        console.log('deleted')

        dispatch({ type: DELETE_RDV, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};