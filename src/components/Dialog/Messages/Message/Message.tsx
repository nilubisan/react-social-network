import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import {decode} from 'html-entities';
import style from './Message.module.css';
import {brToNl} from '../../../../helpers/formatText';

export interface IMessage {
  messageID: string;
  isFriendsMessage: boolean;
  friendName?: string;
  messageDate: Date;
  messageText: string;
  deleteMessage: (_msgId: string) => void;
}
const Message: FC<{
  messageID: IMessage['messageID'];
  isFriendsMessage: IMessage['isFriendsMessage'];
  friendName: IMessage['friendName'];
  messageDate: IMessage['messageDate'];
  messageText: IMessage['messageText'];
  deleteMessage: IMessage['deleteMessage'];
}> = ({
  messageID,
  isFriendsMessage,
  friendName,
  messageDate,
  messageText,
  deleteMessage
}) => {
  const msgDate = new Date(messageDate).toLocaleString();
  return (
    <div
      id={messageID}
      className={`${style.message} ${
        isFriendsMessage ? style.message__right : style.message__left
      }`}
    >
      <div className={style.message__header}>
      <p className={style['message__sender-name']}>
        {isFriendsMessage ? decode(friendName) : 'You'}
      </p>
        <FontAwesomeIcon icon={faRemove} className={style.btn__remove} onClick={() => deleteMessage(messageID)}/>
      </div>

      <p className={style.message__text}>{brToNl(decode(messageText))}</p>
      <p className={style.message__date}>{msgDate}</p>

    </div>
  );
};

export default Message;
