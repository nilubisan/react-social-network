import { Dispatch } from 'react';
import { apiService } from '../../helpers/api';
import { AuthParameters } from '../../components/Login/LoginContainer';

const SET_AUTH_DATA = 'set-auth-data';
const IS_LOADING = 'is-loading';
const SET_AUTH_ERROR = 'set-auth-error';
const SET_AUTH_CAPTCHA_URL = 'set-auth-captcha-url';

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

export const SetAuthErrorAC = (errorMessage: string) => ({
  type: SET_AUTH_ERROR,
  errorMessage,
});

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: IS_LOADING,
  isLoading,
});

export const SetAuthCaptchaAC = (captchaUrl: string) => ({
  type: SET_AUTH_CAPTCHA_URL,
  captchaUrl,
});

export const setAuthData = () =>
  function (dispatch: Dispatch<any>) {
    return apiService.getAuthData().then(({ id, email, login }) =>
      dispatch(
        SetAuthDataAC({
          id,
          email,
          login,
        }),
      ),
    );
  };

export const setAuthCaptcha = () =>
  function (dispatch: Dispatch<any>) {
    return apiService
      .getCaptcha()
      .then((captchaUrl: string) => dispatch(SetAuthCaptchaAC(captchaUrl)));
  };

export const authMe = (authParameters: AuthParameters, setStatus: (_status: string) => void) =>
  function (dispatch: Dispatch<any>) {
    dispatch(ToggleIsLoadingAC(true));
    return apiService
      .authMe(authParameters)
      .then(async (res) => {
        if (typeof res === 'number') await dispatch(setAuthData());
        else if (res === 'captcha') await dispatch(setAuthCaptcha());
        else setStatus(res);
      })
      .then(() => dispatch(ToggleIsLoadingAC(false)));
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
  isError: false,
  errorMessage: '',
  captchaUrl: '',
};

const AuthReducer = (state: any = initialState, action: any = {} as any) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_AUTH_DATA:
      newState.id = action.id;
      newState.login = action.login;
      newState.email = action.email;
      newState.isAuth = !!action.id;
      newState.captchaUrl = '';
      break;
    case SET_AUTH_ERROR:
      newState.isError = true;
      newState.errorMessage = action.errorMessage;
      break;
    case SET_AUTH_CAPTCHA_URL:
      newState.captchaUrl = action.captchaUrl;
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
