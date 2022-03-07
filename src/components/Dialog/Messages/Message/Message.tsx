import React, { FC } from 'react';
import style from './Message.module.css';

export interface IMessage {
  messageID: string;
  isFriendsMessage: boolean;
  friendName: string;
  messageDate: Date;
  messageText: string;
}
const Message: FC<{
  messageID: IMessage['messageID'];
  isFriendsMessage: IMessage['isFriendsMessage'];
  friendName: IMessage['friendName'];
  messageDate: IMessage['messageDate'];
  messageText: IMessage['messageText'];
}> = ({
  messageID,
  isFriendsMessage,
  friendName,
  messageDate,
  messageText,
}) => {
  const msgDate = new Date(messageDate).toLocaleString();
  return (
    <div
      id={messageID}
      className={`${style.message} ${
        isFriendsMessage ? style.message__right : style.message__left
      }`}
    >
      <p className={style['message__sender-name']}>
        {isFriendsMessage ? friendName : 'You'}
      </p>
      <p className={style.message__text}>{messageText}</p>
      <p className={style.message__date}>{msgDate}</p>
    </div>
  );
};

export default Message;
