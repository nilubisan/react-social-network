import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from './Dialog';
import {
  createMessageActionCreator,
  updateMessageActionCreator,
} from '../../redux/reducers/dialog-reducer';

const DialogContainer = () => {
  const dialogProps = useSelector((state: any) => ({
    users: state.common.users,
    messages: state.dialog.messages,
  }));

  const dispatch = useDispatch();

  const onMessageInputChange = (messageObj: {
    message: string;
    friendID: string;
  }) => {
    const { message, friendID } = messageObj;
    dispatch(
      updateMessageActionCreator({
        message,
        friendID,
      }),
    );
  };

  const onMessageInputSubmit = (friendID: string) => {
    dispatch(createMessageActionCreator(friendID));
  };
  return (
    <Dialog
      users={dialogProps.users}
      messages={dialogProps.messages}
      onMessageInputChange={onMessageInputChange}
      onMessageInputSubmit={onMessageInputSubmit}
    />
  );
};

export default DialogContainer;
