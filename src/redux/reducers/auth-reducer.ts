const SET_AUTH_DATA = 'set-auth-data';

interface IAuthData {
  id: string | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
}

// ********************* ACTIONS ************************
interface Action {
  type: string;
}

export interface SetAuthData extends Action, IAuthData {}

// *********************** ACTION CREATORS ******************************

export const SetAuthDataAC = (authData: IAuthData) => ({
  type: SET_AUTH_DATA,
  ...authData,
});

const initialState: IAuthData = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
};

const AuthReducer = (state: any = initialState, action: any = {} as any) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_AUTH_DATA:
      newState.id = action.id;
      newState.login = action.login;
      newState.email = action.email;
      newState.isAuth = action.isAuth;
      break;
    default:
      return state;
  }
  return newState;
};

export default AuthReducer;
