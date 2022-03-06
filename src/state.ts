import { IPost } from './components/Profile/Post/Post';
import { IMessage } from './components/Dialog/Messages/Message/Message';
import renderEntireTree from './render';
import { IMessagesStore }  from './components/Dialog/Dialog';

export const STATE = {
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
  messages: [] as IMessagesStore[],
  posts: [] as IPost[],
  newMessageText: ''
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
  if (messagesOfTheFriend === undefined) {
      STATE.messages.push({
        friendID,
        messages: [],
      });
  }
  messagesOfTheFriend.messages.push(_message);
  STATE.newMessageText = '';
  renderEntireTree(STATE);
};

export const updateMessageText = (message: string) => {
  STATE.newMessageText = message;
  renderEntireTree(STATE);
}