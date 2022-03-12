import React, { FC } from 'react';
import { IStore } from '../../redux/store';
import Dialog from './Dialog';
import {
  createMessageActionCreator,
  updateMessageActionCreator,
} from '../../redux/reducers/dialog-reducer';

const DialogContainer: FC<{ store: IStore }> = ({ store }) => {
  const users = store.getState().common.users;
  const messages = store.getState().dialog.messages;
  const onMessageInputChange = (messageObj: {
    message: string;
    friendID: string;
  }) => {
    const { message, friendID } = messageObj;
    store.dispatch(
      updateMessageActionCreator({
        message: message,
        friendID,
      }),
    );
  };
  const onMessageInputSubmit = (friendID: string) =>
    store.dispatch(createMessageActionCreator(friendID));
  return (
    <Dialog
      users={users}
      messages={messages}
      onMessageInputChange={onMessageInputChange}
      onMessageInputSubmit={onMessageInputSubmit}
    />
  );
};

export default DialogContainer;
