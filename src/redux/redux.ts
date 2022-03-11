import { combineReducers, createStore } from 'redux';
import DialogReducer from './reducers/dialog-reducer';
import ProfileReducer from './reducers/profile-reducer';

const reducers = combineReducers([DialogReducer, ProfileReducer]);
const store = createStore(reducers);
export default store;
