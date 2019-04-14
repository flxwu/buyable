import { combineReducers } from 'redux';
import user from './user';
import modals from './modals';
import search from './search'

export default combineReducers({ user, modals, search });
