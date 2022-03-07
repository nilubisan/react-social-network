import { IPost } from './components/Profile/Post/Post';
import { IMessage } from './components/Dialog/Messages/Message/Message';
import { IMessagesStore, IUser } from './components/Dialog/Dialog';

export interface IState {
  users: IUser[];
  messages: IMessagesStore[];
  posts: IPost[];
  newMessageText: string;
}

export interface IStore {
  _state: IState;
  getState: () => IState;
  setPost: (_post: IPost) => void;
  createMessage: (_message: IMessage, _friendID: string) => void;
  updateMessageText: (_message: string) => void;
  subscriber: (_observer: (_state: IState) => void) => void;
  renderEntireTree: (_state: IState) => void;
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
      },
      {
        friendID: '6XYOC5yy7I',
        messages: [],
      },
      {
        friendID: 'BGTP5M4599',
        messages: [],
      },
      {
        friendID: 'RQ4D130E0R',
        messages: [],
      },
      {
        friendID: 'RIUz5UXPQD',
        messages: [],
      },
    ] as IMessagesStore[],
    posts: [] as IPost[],
    newMessageText: '',
  },
  getState() {
    return this._state;
  },
  setPost(_post: IPost) {
    console.log(this);
    this._state.posts = [...this._state.posts, _post];
    this.renderEntireTree(this._state);
  },
  createMessage(_message: IMessage, friendID: string) {
    const messagesOfTheFriend = this._state.messages.find(
      (el: IMessagesStore) => el.friendID === friendID,
    );
    messagesOfTheFriend.messages.push(_message);
    this._state.newMessageText = '';
    this.renderEntireTree(this._state);
  },
  updateMessageText(message: string) {
    this._state.newMessageText = message;
    this.renderEntireTree(this._state);
  },
  subscriber(observer: (_state: IState) => void) {
    this.renderEntireTree = observer;
  },
  renderEntireTree(_state: IState) {},
};
// @ts-ignore
window.state = STORE;

export default STORE;
