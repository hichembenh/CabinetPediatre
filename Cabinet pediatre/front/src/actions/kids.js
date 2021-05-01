import { FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getKids = () => async (dispatch) => {
    try {
        const { data } = await api.fetchKid();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createKid = (kid) => async (dispatch) => {
    try {
        const { data } = await api.createKid(kid);
        console.log(kid)
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateKid = (id, kid) => async (dispatch) => {
    try {
        const { data } = await api.updateKid(id, kid);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteKid = (id) => async (dispatch) => {
    try {
        await api.deleteKid(id);
        console.log('deleted')

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
