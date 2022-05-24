import { Dispatch } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { apiService } from '../../helpers/api';
import { SendMessageParameters } from '../../components/Dialog/DialogContainer';

const CREATE_MESSAGE_TEXT = 'create-message';
const UPDATE_MESSAGE_TEXT = 'update-message-text';
const TOGGLE_IS_LOADING = 'toggle-is-loading';
const SET_USERS_WITH_DIALOG = 'set-users-with-dialog';
const SET_MESSAGES = 'set-messages';
const SET_NEW_MESSAGE = 'set-new-message';

// ***************** ACTIONS **************************
interface Action {
  type: string;
}

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export interface ActionCreateMessage extends Action {
  userId: number;
}
export interface ActionUpdateMessageText extends Action {
  message: string;
  userId: number;
}

export interface ActionGetUsersWithDialog extends Action {
  users: any[]
}
export interface ActionSetMessages extends Action {
  messages: any,
  userId: number
}

// ********************* ACTION CREATORS ********************

export const createMessageAC = (friendId: number) => ({
  type: CREATE_MESSAGE_TEXT,
  friendId,
});

const setMessages = (messages: any, userId: number) => ({
  type: SET_MESSAGES,
  messages,
  userId
});

const setNewMessageAC = (message: any, userId: number) => ({
  type: SET_NEW_MESSAGE,
  message,
  userId
})

export const createMessage = (messageParams: SendMessageParameters) =>
  async function (dispatch: Dispatch<any>) {
    console.log(messageParams);
    return apiService
      .sendMessage(messageParams)
      .then((res) => dispatch(setNewMessageAC(res.data.data.message, messageParams.userId)));
  };

export const getMessages = (userId: number) =>
  async function (dispatch: Dispatch<any>) {
    const res = await apiService.getMessages(userId);
    dispatch(setMessages(res, userId));
  }


const setUsersWithDialogAC = (users: any) => ({
  type: SET_USERS_WITH_DIALOG,
  users,
});

export const getUsersWithDialog = () =>
  function (dispatch: Dispatch<any>) {
    dispatch(ToggleIsLoadingAC(true));
    apiService.getUsersWithDialog().then((users: any) => {
      dispatch(setUsersWithDialogAC(users));
      dispatch(ToggleIsLoadingAC(false));
    });
  };

export const updateMessageAC = (params: {
  message: string;
  userId: number;
}) => ({ ...params, type: UPDATE_MESSAGE_TEXT });

const initialState = {
  messages: {},
  users: [] as []
};

const DialogReducer = (
  // eslint-disable-next-line default-param-last
  state: any = initialState,
  action:
    | ActionCreateMessage
    | ActionUpdateMessageText
    | ActionGetUsersWithDialog
    | ActionSetMessages
) => {
  let friendMessages;
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CREATE_MESSAGE_TEXT:
      friendMessages = userState.messages[(action as ActionCreateMessage).userId];
      apiService.sendMessage({
        userId: (action as ActionCreateMessage).userId,
        messageText: friendMessages.newMessageText,
      });
      friendMessages.newMessageText = '';
      break;

    case UPDATE_MESSAGE_TEXT:
      friendMessages = userState.messages[(action as ActionUpdateMessageText).userId];
      friendMessages.newMessageText = (
        action as ActionUpdateMessageText
      ).message;
      break;
    case SET_USERS_WITH_DIALOG:
      userState.users = (action as ActionGetUsersWithDialog).users
      break;
    case SET_MESSAGES:
        userState.messages[(action as ActionSetMessages).userId] = {
        messages: (action as ActionSetMessages).messages.items,
        totalCount: (action as ActionSetMessages).messages.totalCount,
        newMessageText: ''
        }
        break;
      case SET_NEW_MESSAGE:
        // @ts-ignore
        userState.messages[(action as ActionSetMessages).userId].messages.push(action.message);
        userState.messages[(action as ActionSetMessages).userId].newMessageText = '';
        break;
    default:
      return state;
  }
  return userState;
};

export default DialogReducer;
