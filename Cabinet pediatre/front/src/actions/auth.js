import {AUTH, UPDATE_USER} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        router.push('/');
    } catch (error) {
        console.log(error);
    }
};


export const signup = (formData, router) => async (dispatch) => {
    try {

        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        console.log(data)

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (id,formData)=> async (dispatch)=>{
    try{

        const { data } = await api.updateUser(id,formData)
        localStorage.setItem("profile", JSON.stringify(data));
        dispatch({ type: UPDATE_USER, data });


    }catch (error){
        console.log(error.message)
    }
}