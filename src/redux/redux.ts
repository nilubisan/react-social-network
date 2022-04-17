import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
