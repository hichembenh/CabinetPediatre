import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import kids from './kids';

export const reducers = combineReducers({ kids,posts,auth });
