import { Dispatch } from 'react';
import { IUser } from '../../components/Users/User/User';
import { apiService } from '../../helpers/api';

const TOGGLE_FOLLOW_STATUS = 'toggle-follow-status';
const SET_USERS = 'set-users';
const SWITCH_PAGE = 'switch-page';
const TOGGLE_IS_LOADING = 'toggle-is-loading';
const TOGGLE_FOLLOW_IN_PROGRESS = 'toggle-follow-in-progress';

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

export const SetUsersStatusAC = (totalCount: number, usersList: IUser[]) => ({
  type: SET_USERS,
  totalCount,
  usersList,
});

export const SwitchUserPageAC = (newUsersList: any, activePageNumber: any) => ({
  type: SWITCH_PAGE,
  activePageNumber,
  newUsersList,
});

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const ToggleFollowInProgressAC = (id: number) => ({
  type: TOGGLE_FOLLOW_IN_PROGRESS,
  id,
});

export const getUsers = (activePageNumber: number) =>
  function (dispatch: Dispatch<any>, getState: any) {
    if (getState().users.usersList.length === 0) {
      dispatch(ToggleIsLoadingAC(true));
      apiService
        .getUsers(activePageNumber, getState().authData.isAuth)
        .then((usersProps: { totalCount: number; users: IUser[] }) => {
          dispatch(SetUsersStatusAC(usersProps.totalCount, usersProps.users));
          dispatch(ToggleIsLoadingAC(false));
        });
    }
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

export const switchPage = (activePageNum: number) =>
  function (dispatch: Dispatch<any>, getState: any) {
    if (
      activePageNum >= 1 &&
      activePageNum <= Math.ceil(getState().users.totalAmount / 10)
    ) {
      dispatch(ToggleIsLoadingAC(true));
      apiService.getUsers(activePageNum, true).then(({ users }) => {
        dispatch(ToggleIsLoadingAC(false));
        dispatch(SwitchUserPageAC(users, activePageNum));
      });
    }
  };

const initialState = {
  usersList: [] as IUser[],
  activePageNumber: 1,
  isLoading: false,
  followingInProgressUsers: [] as any[],
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
      break;
    case SWITCH_PAGE:
      newState.activePageNumber = action.activePageNumber;
      newState.usersList = action.newUsersList;
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
