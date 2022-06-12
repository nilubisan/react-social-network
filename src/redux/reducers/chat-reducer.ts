import { AnyAction } from 'redux';

export const setChatDataAC = (
  connectionStatus: string,
  chatOpeningTimestamp: number,
) => ({
  type: 'SET_CHAT_DATA',
  connectionStatus,
  chatOpeningTimestamp,
});

export const setChatMessagesAC = (messages: any) => ({
  type: 'SET_CHAT_MESSAGES',
  messages,
});

export const updateChatMessageAC = (message: string) => ({
  type: 'UPDATE_CHAT_MESSAGE',
  newMessageText: message,
});

const initialState = {
  connectionStatus: 'close',
  chatOpeningTimestamp: null as number,
  messages: [] as any[],
  newMessageText: '',
};

const ChatReducer = (state = initialState, action = {} as AnyAction) => {
  let newState = { ...state };
  switch (action.type) {
    case 'SET_CHAT_DATA':
      newState = {
        ...newState,
        connectionStatus: action.connectionStatus,
        chatOpeningTimestamp: action.chatOpeningTimestamp,
      };
      break;
    case 'SET_CHAT_MESSAGES':
      if (action.messages.length === 0) newState.messages = [];
      newState.messages = [...newState.messages, ...action.messages];
      break;
    case 'UPDATE_CHAT_MESSAGE':
      newState.newMessageText = action.newMessageText;
      break;
    default:
      return state;
  }
  return newState;
};

export default ChatReducer;
