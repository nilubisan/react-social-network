import { IPost } from './components/Profile/Post/Post';
import { IMessage } from './components/Dialog/Messages/Message/Message';
import { IMessagesStore, IUser } from './components/Dialog/Dialog';

export interface IState {
  users: IUser[];
  messages: IMessagesStore[];
  posts: IPost[];
  newMessageText: string;
}

let renderEntireTree: undefined | ((_state: IState) => void);

export const STATE: IState = {
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
  ],
  posts: [],
  newMessageText: '',
};
// @ts-ignore
window.state = STATE;

export const setPost = (_post: IPost) => {
  STATE.posts = [...STATE.posts, _post];
  renderEntireTree(STATE);
};

export const createMessage = (_message: IMessage, friendID: string) => {
  const messagesOfTheFriend = STATE.messages.find(
    (el) => el.friendID === friendID,
  );
  messagesOfTheFriend.messages.push(_message);
  STATE.newMessageText = '';
  renderEntireTree(STATE);
};

export const updateMessageText = (message: string) => {
  STATE.newMessageText = message;
  renderEntireTree(STATE);
};

export const subscriber = (observer: (_state: IState) => void) => {
  renderEntireTree = observer;
};
