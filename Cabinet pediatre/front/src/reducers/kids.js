import { FETCH_KID, CREATE_RDV, UPDATE_RDV, DELETE_RDV } from '../constants/actionTypes';

export default (kids = [], action) => {
    switch (action.type) {
        case FETCH_KID:
            return action.payload;
        case CREATE_RDV:
            return [...kids, action.payload];
        case UPDATE_RDV:
            return kids.map((kid) => (kid._id === action.payload._id ? action.payload : kid));
        case DELETE_RDV:
            return kids.filter((kid) => kid._id !== action.payload);
        default:
            return kids;
    }
};

