import { Dispatch } from 'react';
import { IUser } from '../../components/Users/User/User';
import { apiService, GetUsersQueryParams } from '../../helpers/api';

const TOGGLE_FOLLOW_STATUS = 'toggle-follow-status';
const SET_USERS = 'set-users';
const SWITCH_PAGE = 'switch-page';
const TOGGLE_IS_LOADING = 'toggle-is-loading';
const TOGGLE_FOLLOW_IN_PROGRESS = 'toggle-follow-in-progress';
const ALL_USERS = 'all-users';
const FOLLOWED_ONLY = 'followed-only';
const UNFOLLOWED_ONLY = 'unfollowed-only';

const convertDisplayedUsersCategoryToString = (status: boolean) => (
  status === true ? FOLLOWED_ONLY : status === false ? UNFOLLOWED_ONLY : ALL_USERS
);

export const convertDisplayedUsersCategoryToBoolean = (status: string) => (
  status === FOLLOWED_ONLY ? true : status === UNFOLLOWED_ONLY ? false : null
);

// ********************* ACTIONS ************************
interface Action {
  type: string;
}

export interface ActionChangeFollowingStatus extends Action {
  userID: string;
}

export interface ActionSetUsers extends Action {
  pageNumber: number;
}

// *********************** ACTION CREATORS ******************************

export const ChangeFollowingStatusAC = (userID: string, followed: boolean) => ({
  type: TOGGLE_FOLLOW_STATUS,
  userID,
  followed,
});

export const SetUsersStatusAC = (totalCount: number, usersList: IUser[], keyword: string, page: number, usersCategoryToDisplay: boolean) => ({
  type: SET_USERS,
  totalCount,
  usersList,
  keyword,
  page,
  usersCategoryToDisplay: convertDisplayedUsersCategoryToString(usersCategoryToDisplay)
});

export const SwitchUserPageAC = (newUsersList: any, activePageNumber: number, keyword: string, count: number, usersCategoryToDisplay: boolean) => ({
  type: SWITCH_PAGE,
  activePageNumber,
  newUsersList,
  keyword,
  count,
  usersCategoryToDisplay: convertDisplayedUsersCategoryToString(usersCategoryToDisplay)
});

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const ToggleFollowInProgressAC = (id: number) => ({
  type: TOGGLE_FOLLOW_IN_PROGRESS,
  id,
});

export const getUsers = (requestParams: GetUsersQueryParams) =>
  function (dispatch: Dispatch<any>, getState: any) {
      dispatch(ToggleIsLoadingAC(true));
      apiService
        .getUsers(requestParams, getState().authData.isAuth)
        .then((usersProps: { totalCount: number; users: IUser[] }) => {
          dispatch(SetUsersStatusAC(usersProps.totalCount, usersProps.users, requestParams.term, requestParams.page, requestParams.friend));
          dispatch(ToggleIsLoadingAC(false));
        });
  };

export const changeFollowingStatus = (id: string, followed: boolean) =>
  function (dispatch: Dispatch<any>) {
    dispatch(ToggleFollowInProgressAC(+id));
    if (followed) {
      apiService.followUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
        dispatch(ToggleFollowInProgressAC(+id));
      });
    } else {
      apiService.unFollowUser(id).then((isSuccess) => {
        if (isSuccess) dispatch(ChangeFollowingStatusAC(id, followed));
        dispatch(ToggleFollowInProgressAC(+id));
      });
    }
  };

export const switchPage = (requestParams: GetUsersQueryParams) => {
  const {page, term, count, friend} = requestParams;
  return function(dispatch: Dispatch<any>, getState: any) {
    if (
      page >= 1 &&
      page <= Math.ceil(getState().users.totalAmount / count)
    ) {
      dispatch(ToggleIsLoadingAC(true));
      apiService.getUsers(requestParams, true).then(({ users }) => {
        dispatch(SwitchUserPageAC(users, page, term, count, friend));
        dispatch(ToggleIsLoadingAC(false));
      });
    }
  }};

const initialState = {
  usersList: [] as IUser[],
  activePageNumber: 1,
  isLoading: false,
  followingInProgressUsers: [] as any[],
  keyword: '',
  pageSize: 10,
  usersCategoryToDisplay: ALL_USERS
};

const UserReducer = (state: any = initialState, action: any = {} as any) => {
  const newState = { ...state };
  let usersStateChanged: any;
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
