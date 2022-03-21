import axios from 'axios';
import { IUser } from '../../components/Users/User/User';

const TOGGLE_FOLLOW_STATUS = 'toggle-follow-status';
const SET_USERS = 'set-users';

interface Action {
  type: string;
}

export interface ActionChangeFollowingStatus extends Action {
  userID: string;
}

export const ActionChangeFollowingStatusCreator = (userID: string) => ({
  type: TOGGLE_FOLLOW_STATUS,
  userID,
});

export const SetUsersStatusCreator = () => ({
  type: SET_USERS,
});

const initialState = {
  users: [] as IUser[],
};

const UserReducer = (
  state: any = initialState,
  action: ActionChangeFollowingStatus = {} as ActionChangeFollowingStatus,
) => {
  const newState = { ...state };
  let usersStateChanged: any;
  switch (action.type) {
    case TOGGLE_FOLLOW_STATUS:
      usersStateChanged = newState.users.map((user: IUser) => {
        const usr = user;
        if (usr.id === action.userID) {
          usr.followed = !usr.followed;
          return usr;
        }
        return usr;
      });
      return { users: usersStateChanged };
    case SET_USERS:
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
          newState.users = [...newState.users, ...response.data.items];
          return response.data;
        });
      break;
    default:
      return state;
  }
  return newState;
};

export default UserReducer;
