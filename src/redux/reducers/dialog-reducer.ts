import { v4 as uuidv4 } from 'uuid';
import { IMessagesStore } from '../../components/Dialog/Dialog';

const CREATE_MESSAGE_TEXT = 'create-message';
const UPDATE_MESSAGE_TEXT = 'update-message-text';

// ***************** ACTIONS **************************
interface Action {
  type: string;
}

export interface ActionCreateMessage extends Action {
  friendID: string;
}
export interface ActionUpdateMessageText extends Action {
  message: string;
  friendID: string;
}

// ********************* ACTION CREATORS ********************

export const createMessageAC = (friendID: string) => ({
  type: CREATE_MESSAGE_TEXT,
  friendID,
});

export const updateMessageAC = (params: {
  message: string;
  friendID: string;
}) => ({ ...params, type: UPDATE_MESSAGE_TEXT });

const initialState = {
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
};

const DialogReducer = (
  state: any = initialState,
  action:
    | ActionCreateMessage
    | ActionUpdateMessageText = {} as ActionCreateMessage,
) => {
  let friendMessages;
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CREATE_MESSAGE_TEXT:
      friendMessages = userState.messages.find(
        (el: IMessagesStore) =>
          el.friendID === (action as ActionCreateMessage).friendID,
      );
      friendMessages.messages.push({
        messageID: uuidv4(),
        messageDate: new Date(),
        messageText: friendMessages.newMessageText,
        isFriendsMessage: false,
      });
      friendMessages.newMessageText = '';
      break;

    case UPDATE_MESSAGE_TEXT:
      friendMessages = userState.messages.find(
        (el: IMessagesStore) => el.friendID === action.friendID,
      );
      friendMessages.newMessageText = (
        action as ActionUpdateMessageText
      ).message;
      break;
    default:
      return state;
  }
  return userState;
};

export default DialogReducer;
