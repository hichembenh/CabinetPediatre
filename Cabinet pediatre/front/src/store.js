import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import auth from './reducers/auth';
import kids from './reducers/kids';
import rdv from "./reducers/rdv";
import user from './reducers/user'

const reducers = combineReducers({ kids,auth, rdv,user });
const initialState = {}
const middleWare = [thunk]
const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store