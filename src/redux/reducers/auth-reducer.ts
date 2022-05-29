import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { apiService } from '../../helpers/api';
import { AuthParameters } from '../../components/Login/LoginContainer';

const SET_AUTH_DATA = 'set-auth-data';
const IS_LOADING = 'is-loading';
const SET_AUTH_ERROR = 'set-auth-error';
const SET_AUTH_CAPTCHA_URL = 'set-auth-captcha-url';

interface IAuthData {
  id: string;
  login: string;
  email: string;
}

// ******************************************** ACTION CREATORS ************************************************

export const SetAuthDataAC = (authData: IAuthData) => ({
  type: SET_AUTH_DATA,
  ...authData,
});

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: IS_LOADING,
  isLoading,
});

export const SetAuthCaptchaAC = (captchaUrl: string) => ({
  type: SET_AUTH_CAPTCHA_URL,
  captchaUrl,
});

// **************************************** REDUX THUNKS ****************************************************

export const setAuthData = () =>
  async function setAuthDataThunk(dispatch: Dispatch<AnyAction>) {
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
  function setAuthCaptchaThunk(dispatch: Dispatch<AnyAction>) {
    return apiService
      .getCaptcha()
      .then((captchaUrl: string) => dispatch(SetAuthCaptchaAC(captchaUrl)));
  };

export const authMe = (
  authParameters: AuthParameters,
  setStatus: (_status: { message: string }) => void,
) =>
  async function authMeThunk(
    dispatch: ThunkDispatch<AnyAction, AnyAction, AnyAction>,
  ) {
    dispatch(ToggleIsLoadingAC(true));
    return apiService.authMe(authParameters).then(async (res: string) => {
      dispatch(ToggleIsLoadingAC(false));
      if (typeof res === 'number') {
        await dispatch(setAuthData());
      } else if (res === 'captcha') {
        await dispatch(setAuthCaptcha());
      } else {
        setStatus({ message: res });
      }
      return res;
    });
  };

export const logOut = () =>
  function logOutThunk(dispatch: Dispatch<AnyAction>) {
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

// ****************************************REDUCER******************************************************

const initialState = {
  id: null as number,
  login: null as string,
  email: null as string,
  isLoading: false,
  isError: false,
  isAuth: false,
  errorMessage: '',
  captchaUrl: '',
};

const AuthReducer = (state = initialState, action = {} as AnyAction) => {
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
