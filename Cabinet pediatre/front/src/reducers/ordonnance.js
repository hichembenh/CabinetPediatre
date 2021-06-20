import {CREATE_ORD, FETCH_ORD} from "../constants/actionTypes";

export default (ords = [], action) => {
    switch (action.type) {
        case FETCH_ORD:
            return action.payload;
        case CREATE_ORD:
            return [...ords, action.payload];
        default:
            return ords;
    }
};

