import { RootState } from '../../redux/redux';

export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectNewMessageText = (state: RootState) =>
  state.chat.newMessageText;
export const selectConnectionStatus = (state: RootState) => state.chat.connectionStatus;
