import React, { FC } from 'react';
import Message, { IMessage } from './Message/Message';
import style from './Messages.module.css';
import CreateMessage, { INewMessage } from './CreateMessage/CreateMessage';

export interface IMessagesProps {
  userName: string;
  userID: string;
  messages: IMessage[];
  newMessageText: string;
  createMessage: (_message: IMessage, _friendID: string) => void;
  updateMessageText: (_message: string) => void;
}

const Messages: FC<{
  userName: IMessagesProps['userName'];
  userID: IMessagesProps['userID']
  messages: IMessagesProps['messages'];
  createMessage: IMessagesProps['createMessage']
  updateMessageText: IMessagesProps['updateMessageText']
  newMessageText: IMessagesProps['newMessageText']
}> = ({ userName, userID, messages, createMessage, updateMessageText, newMessageText }) => {
  const sendMessage = (message: INewMessage) => createMessage({...message, friendName: userName}, userID);
  return (
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
    <div className={style.messages__input}>
        <CreateMessage sendMessage={sendMessage} updateMessageText={updateMessageText} inputMessageText={newMessageText}/>
    </div>
  </div>
  );
};

export default Messages;
