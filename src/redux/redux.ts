import { combineReducers, createStore } from 'redux';
import AuthReducer from './reducers/auth-reducer';
import DialogReducer from './reducers/dialog-reducer';
import ProfileReducer from './reducers/profile-reducer';
// import SidebarReducer from './reducers/sidebar-reducer';
import UserReducer from './reducers/user-reducer';

const reducers = combineReducers({
  users: UserReducer,
  // sidebar: SidebarReducer,
  profile: ProfileReducer,
  dialog: DialogReducer,
  authData: AuthReducer,
});
const store = createStore(reducers);
export default store;
