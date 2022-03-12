import React, { FC } from 'react';
import Message, { IMessage } from './Message/Message';
import style from './Messages.module.css';
import CreateMessage from './CreateMessage/CreateMessage';
import { ActionCreateMessage } from '../../../redux/reducers/dialog-reducer';

export interface IMessagesProps {
  userName: string;
  userID: string;
  messages: IMessage[];
  newMessageText: string;
  onMessageInputChange: (messageObj: {
    message: string;
    friendID: string;
  }) => void;
  onMessageInputSubmit: (friendID: string) => void;
}

const Messages: FC<{
  userName: IMessagesProps['userName'];
  userID: IMessagesProps['userID'];
  messages: IMessagesProps['messages'];
  onMessageInputChange: IMessagesProps['onMessageInputChange'];
  onMessageInputSubmit: IMessagesProps['onMessageInputSubmit'];
  newMessageText: IMessagesProps['newMessageText'];
}> = ({
  userName,
  userID,
  messages,
  onMessageInputChange,
  onMessageInputSubmit,
  newMessageText,
}) => (
  <div className={style.messages}>
    <div className={style.messages__header}>
      <div className={style['header__current-dialog-user']}>
        <img
          className={style['current-dialog-user-pic']}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU"
          alt=""
        />
        <span className={style['current-dialog-user-name']}>{userName}</span>
      </div>
    </div>
    <div className={style.messages__main}>
      {messages.map((message) => (
        <Message
          key={message.messageID}
          messageID={message.messageID}
          isFriendsMessage={message.isFriendsMessage}
          friendName={message.friendName}
          messageDate={message.messageDate}
          messageText={message.messageText}
        />
      ))}
    </div>
    <div className={style.messages__input}>
      <CreateMessage
        friendID={userID}
        onMessageInputChange={onMessageInputChange}
        onMessageInputSubmit={onMessageInputSubmit}
        inputMessageText={newMessageText}
      />
    </div>
  </div>
);

export default Messages;
