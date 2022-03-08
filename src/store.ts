import { v4 as uuidv4 } from 'uuid';
import { IPost } from './components/Profile/Post/Post';
import { IMessage } from './components/Dialog/Messages/Message/Message';
import { IMessagesStore, IUser } from './components/Dialog/Dialog';
import ProfileReducer, {
  ActionSetPost,
  ActionUpdatePostText,
} from './reducers/profile-reducer';
import DialogReducer, {
  ActionCreateMessage,
  ActionUpdateMessageText,
} from './reducers/dialog-reducer';

export interface IState {
  common: {
    users: IUser[];
  };
  dialog: {
    messages: IMessagesStore[];
  };
  profile: {
    posts: IPost[];
    newPostText: string;
  };
}

export interface IStore {
  _state: IState;
  getState: () => IState;
  subscriber: (_observer: (_state: IState) => void) => void;
  renderEntireTree: (_state: IState) => void;
}

const STORE = {
  _state: {
    common: {
      users: [
        {
          name: 'Ann',
          id: 'X65SPP0CM6',
        },
        {
          name: 'Michael',
          id: '6XYOC5yy7I',
        },
        {
          name: 'Tonya',
          id: 'BGTP5M4599',
        },
        {
          name: 'Oleg',
          id: 'RQ4D130E0R',
        },
        {
          name: 'Farid',
          id: 'RIUz5UXPQD',
        },
      ],
    },
    dialog: {
      messages: [
        {
          friendID: 'X65SPP0CM6',
          messages: [],
          newMessageText: '',
        },
        {
          friendID: '6XYOC5yy7I',
          messages: [],
          newMessageText: '',
        },
        {
          friendID: 'BGTP5M4599',
          messages: [],
          newMessageText: '',
        },
        {
          friendID: 'RQ4D130E0R',
          messages: [],
          newMessageText: '',
        },
        {
          friendID: 'RIUz5UXPQD',
          messages: [],
          newMessageText: '',
        },
      ] as IMessagesStore[],
    },
    profile: {
      posts: [] as IPost[],
      newPostText: '',
    },
  },
  dispatch(
    action:
      | ActionSetPost
      | ActionCreateMessage
      | ActionUpdateMessageText
      | ActionUpdatePostText,
  ) {
    this._state.profile = ProfileReducer(
      this._state.profile,
      action as ActionSetPost | ActionUpdatePostText,
    );
    this._state.dialog = DialogReducer(
      this._state.dialog,
      action as ActionCreateMessage | ActionUpdateMessageText,
    );
    this.renderEntireTree(this._state);
  },
  getState() {
    return this._state;
  },
  subscriber(observer: (_state: IState) => void) {
    this.renderEntireTree = observer;
  },
  renderEntireTree(_state: IState) {},
};

// @ts-ignore
window.state = STORE;

export default STORE;
