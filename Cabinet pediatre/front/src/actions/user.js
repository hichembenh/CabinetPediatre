import * as api from "../api";
import {FETCH_USER, UPDATE_USER} from "../constants/actionTypes";

export const getUsers= () => async (dispatch)=>{
    try{
        const {data} = await api.fetchUser()
        console.log('test')
        dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = (id,formData)=> async (dispatch)=>{
    try{

        const { data } = await api.updateUser(id,formData)
        localStorage.setItem("profile", JSON.stringify(data));
        dispatch({ type: UPDATE_USER, data });


    }catch (error){
        console.log(error.message)
    }
}