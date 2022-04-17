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
      .post(
        `/follow/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'API-KEY': API_KEY,
          },
        },
      )
      .then((response) => !response.data.resultCode);
  },
  unFollowUser(userId: string) {
    return instanceAuth
      .delete(`/follow/${userId}`, {
        withCredentials: true,
        headers: {
          'API-KEY': API_KEY,
        },
      })
      .then((response) => !response.data.resultCode);
  },
  getProfile(userId: string) {
    return instanceUnauth
    .get(`/profile/${userId}`).then((response) => response.data)
  }
};
