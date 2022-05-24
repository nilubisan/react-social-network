import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Message, { IMessage } from './Message/Message';
import style from './Messages.module.css';
import CreateMessage from './CreateMessage/CreateMessage';
import { selectId } from '../../Login/AuthSelectors';

export interface IMessagesProps {
  userName: string;
  userId: number;
  messages: IMessage[];
  newMessageText: string;
  onMessageInputChange: (_messageObj: {
    message: string;
    userId: number;
  }) => void;
  onMessageInputSubmit: (_userId: number, _message: string) => void;
}

const Messages: FC<{
  userName: IMessagesProps['userName'];
  userId: IMessagesProps['userId'];
  messages: any;
  onMessageInputChange: IMessagesProps['onMessageInputChange'];
  onMessageInputSubmit: IMessagesProps['onMessageInputSubmit'];
  newMessageText: IMessagesProps['newMessageText'];
}> = ({
  userName,
  userId,
  messages,
  onMessageInputChange,
  onMessageInputSubmit,
  newMessageText,
}) => {
  const authUserId = useSelector(selectId);
  return (
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
      {messages.map((message:any) => (
        <Message
          key={message.id}
          messageID={message.id}
          isFriendsMessage={message.recipientId === authUserId}
          friendName={message.senderName}
          messageDate={message.addedAt}
          messageText={message.body}
        />
      ))}
    </div>
    <div className={style.messages__input}>
      <CreateMessage
        userId={userId}
        onMessageInputChange={onMessageInputChange}
        onMessageInputSubmit={onMessageInputSubmit}
        inputMessageText={newMessageText}
      />
    </div>
  </div>
)
      };

export default Messages;
