import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { IUser } from '../../components/Users/User/User';
import { RootState } from '../redux';
import { apiService, GetUsersQueryParams } from '../../helpers/api';

const TOGGLE_FOLLOW_STATUS = 'toggle-follow-status';
const SET_USERS = 'set-users';
const SWITCH_PAGE = 'switch-page';
const TOGGLE_IS_LOADING = 'toggle-is-loading';
const TOGGLE_FOLLOW_IN_PROGRESS = 'toggle-follow-in-progress';
export const ALL_USERS = 'all-users';
export const FOLLOWED_ONLY = 'followed-only';
export const UNFOLLOWED_ONLY = 'unfollowed-only';

const convertDisplayedUsersCategoryToString = (status: boolean) =>
  status === true
    ? FOLLOWED_ONLY
    : status === false
    ? UNFOLLOWED_ONLY
    : ALL_USERS;

export const convertDisplayedUsersCategoryToBoolean = (status: string) =>
  status === FOLLOWED_ONLY ? true : status === UNFOLLOWED_ONLY ? false : null;

// ****************************************ACTION CREATORS****************************************************

export const ChangeFollowingStatusAC = (userID: number, followed: boolean) => ({
  type: TOGGLE_FOLLOW_STATUS,
  userID,
  followed,
});

export const SetUsersStatusAC = (
  totalCount: number,
  usersList: IUser[],
  keyword: string,
  page: number,
  usersCategoryToDisplay: boolean,
) => ({
  type: SET_USERS,
  totalCount,
  usersList,
  keyword,
  page,
  usersCategoryToDisplay: convertDisplayedUsersCategoryToString(
    usersCategoryToDisplay,
  ),
});

export const SwitchUserPageAC = (
  totalCount: number,
  newUsersList: IUser[],
  activePageNumber: number,
  keyword: string,
  count: number,
  usersCategoryToDisplay: boolean,
) => ({
  type: SWITCH_PAGE,
  totalCount,
  activePageNumber,
  newUsersList,
  keyword,
  count,
  usersCategoryToDisplay: convertDisplayedUsersCategoryToString(
    usersCategoryToDisplay,
  ),
});

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const ToggleFollowInProgressAC = (id: number) => ({
  type: TOGGLE_FOLLOW_IN_PROGRESS,
  id,
});

// *******************************************REDUX THUNKS**********************************************************

export const getUsers = (requestParams: GetUsersQueryParams) =>
  function getUsersThunk(
    dispatch: Dispatch<AnyAction>,
    getState: () => RootState,
  ) {
    dispatch(ToggleIsLoadingAC(true));
    apiService
      .getUsers(requestParams, getState().authData.isAuth)
      .then((usersProps: { totalCount: number; users: IUser[] }) => {
        dispatch(
          SetUsersStatusAC(
            usersProps.totalCount,
            usersProps.users,
            requestParams.term,
            requestParams.page,
            requestParams.friend,
          ),
        );
        dispatch(ToggleIsLoadingAC(false));
      });
  };

export const changeFollowingStatus = (id: number, followed: boolean) =>
  function changeFollowingStatusThunk(dispatch: Dispatch<AnyAction>) {
    dispatch(ToggleFollowInProgressAC(+id));
    if (followed) {
      apiService.followUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
        dispatch(ToggleFollowInProgressAC(id));
      });
    } else {
      apiService.unFollowUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
        dispatch(ToggleFollowInProgressAC(+id));
      });
    }
  };

export const switchPage = (requestParams: GetUsersQueryParams) => {
  const { page, term, count, friend } = requestParams;
  return function switchPageThunk(
    dispatch: Dispatch<AnyAction>,
    getState: () => RootState,
  ) {
    if (page >= 1 && page <= Math.ceil(getState().users.totalAmount / count)) {
      dispatch(ToggleIsLoadingAC(true));
      apiService.getUsers(requestParams, true).then(({ totalCount, users }) => {
        dispatch(
          SwitchUserPageAC(totalCount, users, page, term, count, friend),
        );
        dispatch(ToggleIsLoadingAC(false));
      });
    }
  };
};

const initialState = {
  usersList: [] as IUser[],
  activePageNumber: 1,
  isLoading: false,
  followingInProgressUsers: [] as number[],
  keyword: '',
  pageSize: 10,
  usersCategoryToDisplay: ALL_USERS,
  totalAmount: 0,
};

const UserReducer = (state = initialState, action = {} as AnyAction) => {
  const newState = { ...state };
  let usersStateChanged;
  switch (action.type) {
    case TOGGLE_FOLLOW_STATUS:
      usersStateChanged = newState.usersList.map((user: IUser) => {
        const usr = user;
        if (usr.id === action.userID) {
          usr.followed = action.followed;
          return usr;
        }
        return usr;
      });
      return {
        ...newState,
        usersList: usersStateChanged,
      };
    case SET_USERS:
      newState.usersList = [...action.usersList];
      newState.totalAmount = action.totalCount;
      newState.keyword = action.keyword;
      newState.activePageNumber = action.page;
      newState.usersCategoryToDisplay = action.usersCategoryToDisplay;
      break;
    case SWITCH_PAGE:
      newState.activePageNumber = action.activePageNumber;
      newState.usersList = action.newUsersList;
      newState.totalAmount = action.totalCount;
      newState.keyword = action.keyword;
      newState.pageSize = action.count;
      newState.usersCategoryToDisplay = action.usersCategoryToDisplay;
      break;
    case TOGGLE_IS_LOADING:
      newState.isLoading = action.isLoading;
      break;
    case TOGGLE_FOLLOW_IN_PROGRESS:
      if (
        newState.followingInProgressUsers.some((el: number) => el === action.id)
      ) {
        return {
          ...newState,
          followingInProgressUsers: newState.followingInProgressUsers.filter(
            (el: number) => el !== action.id,
          ),
        };
      }
      return {
        ...newState,
        followingInProgressUsers: [
          ...newState.followingInProgressUsers,
          action.id,
        ],
      };
    default:
      return state;
  }

  return newState;
};

export default UserReducer;
