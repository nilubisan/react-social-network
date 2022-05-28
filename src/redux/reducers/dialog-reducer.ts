import { Dispatch } from 'react';
import {AnyAction} from 'redux';
import { apiService } from '../../helpers/api';
import { SendMessageParameters } from '../../components/Dialog/DialogContainer';


const CREATE_MESSAGE_TEXT = 'create-message';
const UPDATE_MESSAGE_TEXT = 'update-message-text';
const TOGGLE_IS_LOADING = 'toggle-is-loading';
const SET_USERS_WITH_DIALOG = 'set-users-with-dialog';
const SET_MESSAGES = 'set-messages';
const SET_NEW_MESSAGE = 'set-new-message';
const DELETE_MESSAGE = 'delete-message';

// ***************** ACTIONS **************************

export const ToggleIsLoadingAC = (isLoading: boolean) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

// ********************* ACTION CREATORS ********************

export const createMessageAC = (friendId: number) => ({
  type: CREATE_MESSAGE_TEXT,
  friendId,
});

export const deleteMessageAC = (msgProps: {msgId: string, userId: number}) => ({
  type: DELETE_MESSAGE,
  msgId: msgProps.msgId,
  userId: msgProps.userId
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
    return apiService
      .sendMessage(messageParams)
      .then((res) => dispatch(setNewMessageAC(res.data.data.message, messageParams.userId)));
  };

  export const deleteMessage = (msgProps: {msgId: string, userId: number}) => 
    async function(dispatch: Dispatch<any>) {
      return apiService
        .deleteMessage(msgProps.msgId)
        .then((deletionStatus:boolean) => {
          if(deletionStatus) dispatch(deleteMessageAC(msgProps));
        })
    }

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
  action: AnyAction
) => {
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
      friendMessages.newMessageText = 
        action.message;
      break;
    case DELETE_MESSAGE:
      console.log(action)
      friendMessages = userState.messages[action.userId];
      friendMessages.messages = friendMessages.messages.filter((message: any) => message.id !== action.msgId)
      break;
    case SET_USERS_WITH_DIALOG:
      userState.users = action.users
      break;
    case SET_MESSAGES:
        userState.messages[action.userId] = {
        messages: action.messages.items,
        totalCount: action.messages.totalCount,
        newMessageText: ''
        }
        break;
      case SET_NEW_MESSAGE:
        // @ts-ignore
        userState.messages[action.userId].messages.push(action.message);
        userState.messages[action.userId].newMessageText = '';
        break;
    default:
      return state;
  }
  return userState;
};

export default DialogReducer;
