import { v4 as uuidv4 } from 'uuid';
import { IState } from '../store';
import { IMessagesStore } from '../components/Dialog/Dialog';

const CREATE_MESSAGE_TEXT = 'create-message';
const UPDATE_MESSAGE_TEXT = 'update-message-text';

// TS INTERFACE
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

export const createMessageActionCreator = (friendID: string) => ({
  type: CREATE_MESSAGE_TEXT,
  friendID,
});

export const updateMessageActionCreator = (params: {
  message: string;
  friendID: string;
}) => ({ ...params, type: UPDATE_MESSAGE_TEXT });

// DialogReducer
const DialogReducer = (
  state: IState['dialog'],
  action: ActionCreateMessage | ActionUpdateMessageText,
) => {
  const userState = { ...state };
  switch (action.type) {
    case CREATE_MESSAGE_TEXT:
      const messagesOfTheFriend = userState.messages.find(
        (el: IMessagesStore) =>
          el.friendID === (action as ActionCreateMessage).friendID,
      );
      const message = {
        messageID: uuidv4(),
        messageDate: new Date(),
        messageText: messagesOfTheFriend.newMessageText,
        isFriendsMessage: false,
      };
      messagesOfTheFriend.messages.push(message);
      messagesOfTheFriend.newMessageText = '';
      return userState;

    case UPDATE_MESSAGE_TEXT:
      const friendMessages = userState.messages.find(
        (el: IMessagesStore) => el.friendID === action.friendID,
      );
      friendMessages.newMessageText = (
        action as ActionUpdateMessageText
      ).message;
      return userState;
    default:
      return userState;
  }
};

export default DialogReducer;
