import React, { FC } from 'react';
import Message, { IMessage } from './Message/Message';
import style from './Messages.module.css';

export interface IMessagesProps {
  userName: string;
  userID: string;
  messages: IMessage[];
}

const Messages: FC<{
  userName: IMessagesProps['userName'];
  messages: IMessagesProps['messages'];
}> = ({ userName, messages }) => (
  <div className={style.messages}>
    <div className={style.messages__header}>
      <div className={style['header__current-dialog-user']}>
        <img
          className={style['current-dialog-user-pic']}
          src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
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
  </div>
);

export default Messages;
