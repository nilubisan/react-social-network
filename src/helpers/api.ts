import axios from 'axios';

export const API_URL = 'https://social-network.samuraijs.com/api/1.0';
export const API_KEY = 'd551ca8e-0007-4cc8-8fb1-dffb040d97e3';
export const DEFAULT_AVATAR_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU';

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
  getUsers(pageNumber: number, auth: boolean) {
    const selectedInstance = auth ? instanceAuth : instanceUnauth;
    return selectedInstance
      .get(`/users?page=${pageNumber}`)
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
  async authMe(
    email: string,
    password: string,
    captchaInput: string,
    rememberMe: boolean,
  ) {
    const parameters =
      captchaInput === ''
        ? {
            email,
            password,
            rememberMe,
          }
        : {
            email,
            password,
            captcha: captchaInput,
            rememberMe,
          };
    try {
      const { data } = await instanceAuth.post(`/auth/login`, parameters);
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
