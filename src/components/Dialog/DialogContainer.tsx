import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from './Dialog';
import {
  updateMessageAC,
  createMessage,
  getUsersWithDialog
} from '../../redux/reducers/dialog-reducer';
import { selectMessages,selectUsers } from './DialogsSelector';
import Preloader from '../Preloader/Preloader';

export interface DialogUserInfo {
  id: number,
  userName: string,
  hasNewMessages: boolean,
  lastDialogActivityDate: string,
  lastUserActivityDate: string,
  newMessagesCount:number,
  photos: {
    small:string,
    large:string
  }
}

export interface SendMessageParameters {
  userId: number,
  messageText: string
}

const DialogContainer = () => {
  const users = useSelector(selectUsers)
  const messages = useSelector(selectMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersWithDialog())
  }, []);


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
    console.log(userId, message)
    dispatch(createMessage({userId, messageText: message}));
  };


  return (
      users.length === 0 ? <Preloader /> : (
        <Dialog
        users={users}
        messages={messages}
        onMessageInputChange={onMessageInputChange}
        onMessageInputSubmit={onMessageInputSubmit}
      />
      )
    )
};

export default DialogContainer;
