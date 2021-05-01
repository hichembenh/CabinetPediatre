import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (kids = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...kids, action.payload];
        case UPDATE:
            return kids.map((kid) => (kid._id === action.payload._id ? action.payload : kid));
        case DELETE:
            return kids.filter((kid) => kid._id !== action.payload);
        default:
            return kids;
    }
};

