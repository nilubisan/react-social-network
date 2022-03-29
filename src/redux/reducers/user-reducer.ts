import axios from 'axios';
import { IUser } from '../../components/Users/User/User';

const TOGGLE_FOLLOW_STATUS = 'toggle-follow-status';
const SET_USERS = 'set-users';
const SWITCH_PAGE = 'switch-page';
const TOGGLE_IS_LOADING = 'toggle-is-loading';

interface Action {
  type: string;
}

export interface ActionChangeFollowingStatus extends Action {
  userID: string;
}

export interface ActionSetUsers extends Action {
  pageNumber: number;
}

export const ActionChangeFollowingStatusCreator = (userID: string) => ({
  type: TOGGLE_FOLLOW_STATUS,
  userID,
});

export const SetUsersStatusCreator = () => ({
  type: SET_USERS,
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

const initialState = {
  usersList: [] as IUser[],
  activePageNumber: 1,
  isLoading: false,
};

const UserReducer = (state: any = initialState, action: any = {} as any) => {
  const newState = { ...state };
  let usersStateChanged: any;
  switch (action.type) {
    case TOGGLE_FOLLOW_STATUS:
      usersStateChanged = newState.usersList.map((user: IUser) => {
        const usr = user;
        if (usr.id === action.userID) {
          usr.followed = !usr.followed;
          return usr;
        }
        return usr;
      });
      return {
        ...newState,
        usersList: usersStateChanged,
      };
    case SET_USERS:
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${state.activePageNumber}`,
        )
        .then((response) => {
          newState.usersList = [...response.data.items];
          newState.totalAmount = response.data.totalCount;
          return response.data;
        });
      break;
    case SWITCH_PAGE:
      newState.activePageNumber = action.activePageNumber;
      newState.usersList = action.newUsersList;
      break;
    case TOGGLE_IS_LOADING:
      newState.isLoading = action.isLoading;
      break;
    default:
      return state;
  }
  return newState;
};

export default UserReducer;
