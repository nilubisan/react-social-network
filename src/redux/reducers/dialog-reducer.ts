import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { apiService } from '../../helpers/api';
import {
  SendMessageParameters,
  DialogUserInfo,
} from '../../components/Dialog/DialogContainer';
import { Message } from '../../components/Dialog/Messages/Messages';

const CREATE_MESSAGE_TEXT = 'create-message';
const UPDATE_MESSAGE_TEXT = 'update-message-text';
const TOGGLE_IS_LOADING = 'toggle-is-loading';
const SET_USERS_WITH_DIALOG = 'set-users-with-dialog';
const SET_MESSAGES = 'set-messages';
const SET_NEW_MESSAGE = 'set-new-message';
const DELETE_MESSAGE = 'delete-message';

// ******************************************** ACTION CREATORS **********************************************

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const createMessageAC = (friendId: number) => ({
  type: CREATE_MESSAGE_TEXT,
  friendId,
});

export const deleteMessageAC = (msgProps: {
  msgId: string;
  userId: number;
}) => ({
  type: DELETE_MESSAGE,
  msgId: msgProps.msgId,
  userId: msgProps.userId,
});

const setMessagesAC = (messages: Message[], userId: number) => ({
  type: SET_MESSAGES,
  messages,
  userId,
});

const setNewMessageAC = (message: Message[], userId: number) => ({
  type: SET_NEW_MESSAGE,
  message,
  userId,
});

const setUsersWithDialogAC = (users: DialogUserInfo[]) => ({
  type: SET_USERS_WITH_DIALOG,
  users,
});

// ************************************************ REDUX THUNKS *************************************************

export const createMessage = (messageParams: SendMessageParameters) =>
  async function createMessageThunk(dispatch: Dispatch<AnyAction>) {
    return apiService
      .sendMessage(messageParams)
      .then((res) =>
        dispatch(setNewMessageAC(res.data.data.message, messageParams.userId)),
      );
  };

export const deleteMessage = (msgProps: { msgId: string; userId: number }) =>
  async function deleteMessageThunk(dispatch: Dispatch<AnyAction>) {
    return apiService
      .deleteMessage(msgProps.msgId)
      .then((deletionStatus: boolean) => {
        if (deletionStatus) dispatch(deleteMessageAC(msgProps));
      });
  };

export const getMessages = (userId: number) =>
  async function getMessagesThunk(dispatch: Dispatch<AnyAction>) {
    const res = await apiService.getMessages(userId);
    dispatch(setMessagesAC(res, userId));
  };

export const getUsersWithDialog = () =>
  function getUsersWithDialogThunk(dispatch: Dispatch<AnyAction>) {
    dispatch(ToggleIsLoadingAC(true));
    apiService.getUsersWithDialog().then((users: DialogUserInfo[]) => {
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
  users: [] as [],
};

// *************************************** REDUCER **********************************************

const DialogReducer = (state = initialState, action = {} as AnyAction) => {
  let friendMessages;
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CREATE_MESSAGE_TEXT:
      friendMessages = userState.messages[action.userId];
      apiService.sendMessage({
        userId: action.userId,
        messageText: friendMessages.newMessageText,
      });
      friendMessages.newMessageText = '';
      break;
    case UPDATE_MESSAGE_TEXT:
      friendMessages = userState.messages[action.userId];
      friendMessages.newMessageText = action.message;
      break;
    case DELETE_MESSAGE:
      friendMessages = userState.messages[action.userId];
      friendMessages.messages = friendMessages.messages.filter(
        (message: Message) => message.id !== action.msgId,
      );
      break;
    case SET_USERS_WITH_DIALOG:
      userState.users = action.users;
      break;
    case SET_MESSAGES:
      userState.messages[action.userId] = {
        messages: action.messages.items,
        totalCount: action.messages.totalCount,
        newMessageText: '',
      };
      break;
    case SET_NEW_MESSAGE:
      userState.messages[action.userId].messages.push(action.message);
      userState.messages[action.userId].newMessageText = '';
      break;
    default:
      return state;
  }
  return userState;
};

export default DialogReducer;
