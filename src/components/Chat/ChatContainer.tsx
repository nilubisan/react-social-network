import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import { apiService } from '../../helpers/api';
import {
  setChatDataAC,
  setChatMessagesAC,
  updateChatMessageAC,
} from '../../redux/reducers/chat-reducer';
import { selectChatMessages, selectNewMessageText } from './ChatSelector';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectChatMessages);
  const newMessageText = useSelector(selectNewMessageText);

  // Event Listeners
  const onChatOpen = (event: Event) => {
    dispatch(setChatDataAC(event.type, event.timeStamp));
  };
  const onChatMessage = (event: MessageEvent) => {
    dispatch(setChatMessagesAC(JSON.parse(event.data)));
  };
  const onChatOpenError = (event: Event) => {
    console.log(event);
  };
  const onEndChat = () => {
    dispatch(setChatDataAC('close', null));
  };

  // Methods
  const startChat = () => {
    apiService.startChat(onChatOpen, onChatMessage, onChatOpenError);
  };

  const endChat = () => {
    apiService.endChat(onEndChat);
    dispatch(setChatMessagesAC([]));
  };

  const sendChatMessage = () => {
    if (newMessageText.length === 0) return;
    apiService.sendChatMessage(newMessageText);
    dispatch(updateChatMessageAC(''));
  };

  const onMessageInputChange = (message: string) => {
    dispatch(updateChatMessageAC(message));
  };

  return (
    <Chat
      startChat={startChat}
      endChat={endChat}
      messages={messages}
      newMessageText={newMessageText}
      onMessageInputChange={onMessageInputChange}
      onMessageInputSubmit={sendChatMessage}
    />
  );
};

export default ChatContainer;
