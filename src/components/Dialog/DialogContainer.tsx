import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from './Dialog';
import {
  updateMessageAC,
  createMessage,
  getUsersWithDialog,
  deleteMessage,
} from '../../redux/reducers/dialog-reducer';
import { selectMessages, selectUsers } from './DialogsSelector';
import Preloader from '../Preloader/Preloader';

export interface UserInfo {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: {
    small: string;
    large: string;
  };
}

export interface OnSendMessageParameters {
  userId: number;
  messageText: string;
}

const DialogContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersWithDialog());
  }, []);

  const users = useSelector(selectUsers);
  const messages = useSelector(selectMessages);

  const onMessageInputChange = (messageObj: {
    message: string;
    userId: number;
  }) => {
    const { message, userId } = messageObj;
    dispatch(
      updateMessageAC({
        message,
        userId,
      }),
    );
  };

  const onMessageInputSubmit = (userId: number, message: string) => {
    dispatch(createMessage({ userId, messageText: message }));
  };

  const onMessageDelete = (messageProps: {
    messageId: string;
    userId: number;
  }) => {
    dispatch(deleteMessage(messageProps));
  };

  return users.length === 0 ? (
    <Preloader />
  ) : (
    <Dialog
      users={users}
      messages={messages}
      onMessageInputChange={onMessageInputChange}
      onMessageInputSubmit={onMessageInputSubmit}
      onMessageDelete={onMessageDelete}
    />
  );
};

export default DialogContainer;
