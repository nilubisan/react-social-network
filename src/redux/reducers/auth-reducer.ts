import { Dispatch } from 'react';
import { apiService } from '../../helpers/api';

const SET_AUTH_DATA = 'set-auth-data';
const IS_LOADING = 'is-loading';

interface IAuthData {
  id: string | null;
  login: string | null;
  email: string | null;
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

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: IS_LOADING,
  isLoading,
});

export const authMe = () =>
  function (dispatch: Dispatch<any>) {
    dispatch(ToggleIsLoadingAC(true));
    apiService
      .authMe()
      .then((myId) =>
        myId != null
          ? dispatch(
              SetAuthDataAC({
                id: myId,
                login: null,
                email: null,
              }),
            )
          : null,
      )
      .then(() => dispatch(ToggleIsLoadingAC(false)));
  };

export const setAuthData = () =>
  function (dispatch: Dispatch<any>, getState: any) {
    if (getState().authData.isAuth)
      apiService.getAuthData().then(({ id, email, login }) =>
        dispatch(
          SetAuthDataAC({
            id,
            email,
            login,
          }),
        ),
      );
  };

export const logOut = () =>
  function (dispatch: Dispatch<any>) {
    apiService.logOut().then((loggedOutStatus) => {
      if (loggedOutStatus)
        dispatch(
          SetAuthDataAC({
            id: null,
            login: null,
            email: null,
          }),
        );
    });
  };

const initialState: any = {
  id: null,
  login: null,
  email: null,
  isLoading: false,
};

const AuthReducer = (state: any = initialState, action: any = {} as any) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_AUTH_DATA:
      newState.id = action.id;
      newState.login = action.login;
      newState.email = action.email;
      newState.isAuth = !!action.id;
      break;
    case IS_LOADING:
      newState.isLoading = action.isLoading;
      break;
    default:
      return state;
  }
  return newState;
};

export default AuthReducer;
