import React from 'react';
import style from './Messages.module.css';

const Messages = () => (
  <div className={style.messages}>
    <div className={style.messages__header}>
      <div className={style['header__current-dialog-user']}>
        <img
          className={style['current-dialog-user-pic']}
          src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
          alt=""
        />
        <span className={style['current-dialog-user-name']}>Ann</span>
      </div>
    </div>
    <div className={style.messages__main} />
  </div>
);

export default Messages;
