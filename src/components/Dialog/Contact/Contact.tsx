import React, { FC } from 'react';
import style from './Contact.module.css';

interface ContactProps {
  username: string;
  isActive: boolean;
}

const Contact: FC<{
  username: ContactProps['username'];
  isActive: ContactProps['isActive'];
}> = ({ username, isActive }) => (
  <div className={`${style.contact} ${isActive ? style.active : null}`}>
    <img
      className={style.contact__avatar}
      src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
      alt=""
    />
    <span className={style.contact__username}>{username}</span>
  </div>
);

export default Contact;
