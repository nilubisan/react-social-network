import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducers/app-reducer';
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
  appData: AppReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof reducers>;
export default store;
