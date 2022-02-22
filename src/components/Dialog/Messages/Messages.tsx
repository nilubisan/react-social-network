import React, {FC} from 'react';
import Message from './Message/Message';
import style from './Messages.module.css';

interface MessagesProps {
  activeUser: string;
}

const Messages: FC<{activeUser: MessagesProps['activeUser']}> = ( { activeUser }) => (
  <div className={style.messages}>
    <div className={style.messages__header}>
      <div className={style['header__current-dialog-user']}>
        <img
          className={style['current-dialog-user-pic']}
          src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
          alt=""
        />
        <span className={style['current-dialog-user-name']}>{activeUser}</span>
      </div>
    </div>
    <div className={style.messages__main}>
      <Message msgText='Hello' />
      <Message msgText='How are you' />
      <Message msgText='I am fine' />
    </div>
  </div>
);

export default Messages;
