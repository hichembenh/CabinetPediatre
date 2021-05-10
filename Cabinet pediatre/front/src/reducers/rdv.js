import {CREATE_RDV, DELETE_RDV, FETCH_RDV, UPDATE_RDV} from "../constants/actionTypes";

export default (rdvs = [], action) => {
    switch (action.type) {
        case FETCH_RDV:
            return action.payload;
        case CREATE_RDV:
            return [...rdvs, action.payload];
        case UPDATE_RDV:
            return rdvs.map((rdv) => (rdv._id === action.payload._id ? action.payload : rdv));
        case DELETE_RDV:
            return rdvs.filter((rdv) => rdv._id !== action.payload);
        default:
            return rdvs;
    }
};

