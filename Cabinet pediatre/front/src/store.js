import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import auth from './reducers/auth';
import kids from './reducers/kids';
import rdv from "./reducers/rdv";

const reducers = combineReducers({ kids,auth, rdv });
const initialState = {}
const middleWare = [thunk]
const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store