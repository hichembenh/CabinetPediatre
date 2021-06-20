import * as api from '../api/index.js';
import {CREATE_ORD} from "../constants/actionTypes.js";

export const createOrd =(newOrd) =>async (dispatch)=>{

    try {
        const {data} = await api.createOrd(newOrd)
        dispatch({
            type:CREATE_ORD,
            payload:data
        })
    }catch (e) {
        console.log(e.message)
    }
}

export const deleteOrd = (id) => async (dispatch)=>{
    try{
        await api.deleteOrd(id);
        console.log("ordonnance deleted")
    }catch (e){
        console.log(e.message)
    }
}
