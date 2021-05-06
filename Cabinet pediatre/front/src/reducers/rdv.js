import {CREATE, DELETE, FETCH_ALL, UPDATE} from "../constants/actionTypes";

export default (rdvs = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...rdvs, action.payload];
        case UPDATE:
            return rdvs.map((rdv) => (rdv._id === action.payload._id ? action.payload : rdv));
        case DELETE:
            return rdvs.filter((rdv) => rdv._id !== action.payload);
        default:
            return rdvs;
    }
};

