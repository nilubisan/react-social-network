import axios from 'axios';
import { AuthParameters } from '../components/Login/LoginContainer';

export const API_URL = 'https://social-network.samuraijs.com/api/1.0';
export const API_KEY = 'bae7cc20-15dd-4b73-b3de-080bbbd306b0';
export const DEFAULT_AVATAR_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU';

  export interface GetUsersQueryParams {
    count? : number,
    page?: number,
    term?: string,
    friend?: boolean
  }

const instanceAuth = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY,
  },
});

const instanceUnauth = axios.create({
  baseURL: API_URL,
});

export const apiService = {
  getUsers(queryParameters: GetUsersQueryParams, isAuth: boolean) {
    const {count = 10, page=1, term, friend} = queryParameters;
    const selectedInstance = isAuth ? instanceAuth : instanceUnauth;
    let requestString = term ? `/users?count=${count}&page=${page}&term=${term}`: `/users?count=${count}&page=${page}`;
    requestString = friend === undefined ? requestString : `${requestString}&friend=${friend}`;
    return selectedInstance
      .get(requestString)
      .then((response) => ({
        totalCount: response.data.totalCount,
        users: response.data.items,
      }));
  },
  followUser(userId: string) {
    return instanceAuth
      .post(`/follow/${userId}`)
      .then((response) => !response.data.resultCode);
  },
  unFollowUser(userId: string) {
    return instanceAuth
      .delete(`/follow/${userId}`)
      .then((response) => !response.data.resultCode);
  },
  getProfile(userId: string) {
    return instanceAuth
      .get(`/profile/${userId}`)
      .then((response) => response.data);
  },
  getUserStatus(userId: string) {
    return instanceAuth
      .get(`/profile/status/${userId}`)
      .then((response) => response.data);
  },
  setStatus(statusText: string) {
    return instanceAuth
      .put('/profile/status', {
        status: statusText,
      })
      .then((response) => !response.data.resultCode);
  },
  async authMe(authParameters: AuthParameters) {
    const { email, password, rememberMe, captchaInput } = authParameters;
    const authCredentials =
      captchaInput === '' ? { email, password, rememberMe } : authParameters;
    try {
      const { data } = await instanceAuth.post(`/auth/login`, authCredentials);
      return data.resultCode === 0
        ? data.data.userId
        : data.resultCode === 10
        ? 'captcha'
        : data.messages[0];
    } catch (error) {
      return error.message;
    }
  },
  getAuthData() {
    return instanceAuth.get(`/auth/me`).then((response) => ({
      id: response.data.data.id,
      email: response.data.data.email,
      login: response.data.data.login,
    }));
  },
  logOut() {
    return instanceAuth.delete(`/auth/login`).then((response) => {
      if (response.data.resultCode === 0) return true;
      return false;
    });
  },
  getCaptcha() {
    return instanceAuth
      .get(`/security/get-captcha-url`)
      .then((response) => response.data.url);
  },
};
