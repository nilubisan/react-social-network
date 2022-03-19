import { IUser } from '../../components/Users/User/User';

const avaUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU';
const TOGGLE_FOLLOW_STATUS = 'toggle-follow-status';

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

const initialState = {
  users: [
    {
      name: 'Ann',
      id: 'X65SPP0CM6',
      about: 'Hi there!',
      avatarUrl: avaUrl,
      isFollowed: true,
    },
    {
      name: 'Michael',
      id: '6XYOC5yy7I',
      about: 'Busy!!!',
      avatarUrl: avaUrl,
      isFollowed: true,
    },
    {
      name: 'Tonya',
      id: 'BGTP5M4599',
      about: 'Talk to me...',
      avatarUrl: avaUrl,
      isFollowed: false,
    },
    {
      name: 'Oleg',
      id: 'RQ4D130E0R',
      about: 'At work',
      avatarUrl: avaUrl,
      isFollowed: true,
    },
    {
      name: 'Farid',
      id: 'RIUz5UXPQD',
      about: '...',
      avatarUrl: avaUrl,
      isFollowed: false,
    },
  ],
};

const UserReducer = (
  state: any = initialState,
  action: ActionChangeFollowingStatus = {} as ActionChangeFollowingStatus,
) => {
  const newState = JSON.parse(JSON.stringify(state));
  let usersStateChanged: any;
  switch (action.type) {
    case TOGGLE_FOLLOW_STATUS:
      usersStateChanged = newState.users.map((user: IUser) => {
        const usr = user;
        if (usr.id === action.userID) {
          usr.isFollowed = !usr.isFollowed;
          return usr;
        }
        return usr;
      });
      return { users: usersStateChanged };
    default:
      return state;
  }
};

export default UserReducer;
