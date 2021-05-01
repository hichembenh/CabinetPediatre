import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import auth from './reducers/auth'
import kids from './reducers/kids'

const reducer = combineReducers({auth,kids})
const initialState = {}
const middleWare = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store