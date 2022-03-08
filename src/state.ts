import { v4 as uuidv4 } from 'uuid';
import { IPost } from './components/Profile/Post/Post';
import { IMessage } from './components/Dialog/Messages/Message/Message';
import { IMessagesStore, IUser } from './components/Dialog/Dialog';

const CREATE_MESSAGE_TEXT = 'create-message';
const UPDATE_MESSAGE_TEXT = 'update-message-text';
const SET_POST = 'set-post';
const UPDATE_POST = 'update-post-text';
export interface IState {
  users: IUser[];
  messages: IMessagesStore[];
  posts: IPost[];
  newMessageText: string;
  newPostText: string;
}

export interface IStore {
  _state: IState;
  getState: () => IState;
  setPost: (_post: IPost) => void;
  createMessage: (_message: IMessage, _friendID: string) => void;
  updateMessageText: (_message: string) => void;
  updatePostText: (_message: string) => void;
  subscriber: (_observer: (_state: IState) => void) => void;
  renderEntireTree: (_state: IState) => void;
}

interface Action {
  type: string;
}
export interface ActionSetPost extends Action {
  post: IPost;
}

export interface ActionCreateMessage extends Action {
  message: string;
  friendID: string;
}

export interface ActionUpdateMessageText extends Action {}

export interface ActionUpdatePostText extends Action {
  message: string;
}

const STORE = {
  _state: {
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
    posts: [] as IPost[],
    newMessageText: '',
    newPostText: '',
  },
  dispatch(
    action:
      | ActionSetPost
      | ActionCreateMessage
      | ActionUpdateMessageText
      | ActionUpdatePostText,
  ) {
    switch (action.type) {
      case SET_POST:
        this._setPost();
        break;

      case CREATE_MESSAGE_TEXT:
        this._createMessage((action as ActionCreateMessage).friendID);
        break;

      case UPDATE_MESSAGE_TEXT:
        this._updateMessageText({
          message: (action as ActionCreateMessage).message,
          friendID: (action as ActionCreateMessage).friendID,
        });
        break;

      case UPDATE_POST:
        this._updatePostText((action as ActionUpdatePostText).message);
        break;

      default:
        break;
    }
  },
  getState() {
    return this._state;
  },
  _setPost() {
    const post = {
      postID: uuidv4(),
      postDate: new Date(),
      postMessage: this._state.newPostText,
    };
    this._state.posts = [...this._state.posts, post];
    this._state.newPostText = '';
    this.renderEntireTree(this._state);
  },
  _createMessage(friendID: string) {
    const messagesOfTheFriend = this._state.messages.find(
      (el: IMessagesStore) => el.friendID === friendID,
    );
    const message = {
      messageID: uuidv4(),
      messageDate: new Date(),
      messageText: messagesOfTheFriend.newMessageText,
      isFriendsMessage: false,
    };
    messagesOfTheFriend.messages.push(message);
    messagesOfTheFriend.newMessageText = '';
    this.renderEntireTree(this._state);
  },
  _updateMessageText(params: { message: string; friendID: string }) {
    const { message, friendID } = params;
    const messagesOfTheFriend = this._state.messages.find(
      (el: IMessagesStore) => el.friendID === friendID,
    );
    messagesOfTheFriend.newMessageText = message;
    this.renderEntireTree(this._state);
  },
  _updatePostText(message: string) {
    this._state.newPostText = message;
    this.renderEntireTree(this._state);
  },
  subscriber(observer: (_state: IState) => void) {
    this.renderEntireTree = observer;
  },
  renderEntireTree(_state: IState) {},
};

export const setPostActionCreator = () => ({
  type: SET_POST,
});

export const updatePostActionCreator = (message: string) => ({
  message,
  type: UPDATE_MESSAGE_TEXT,
});

export const createMessageActionCreator = (friendID: string) => ({
  type: CREATE_MESSAGE_TEXT,
  friendID,
});

export const updateMessageActionCreator = (params: {
  message: string;
  friendID: string;
}) => ({ ...params, type: UPDATE_MESSAGE_TEXT });

// @ts-ignore
window.state = STORE;

export default STORE;
