import React, { FC } from 'react';
import style from './Contact.module.css';

interface ContactProps {
  name: string;
  isActive: boolean;
}

const Contact: FC<{
  name: ContactProps['name'];
  isActive: ContactProps['isActive'];
}> = ({ name, isActive }) => (
  <div className={`${style.contact} ${isActive ? style.active : ''}`}>
    <img
      className={style.contact__avatar}
      src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
      alt=""
    />
    <span className={style.contact__name}>{name}</span>
  </div>
);

export default Contact;
