import {CREATE,DELETE} from "../constants/actionTypes";
import * as api from '../api/index.js';

export const createRdv = (rdv) => async (dispatch)=>{

    try {
        const {data} = await api.createRdv(rdv)
        console.log(rdv)
        dispatch({ type: CREATE, payload: data });
    } catch (e){
        console.log(e.message)
        console.log('create error')
    }

}