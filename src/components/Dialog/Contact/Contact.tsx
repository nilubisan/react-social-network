import React, { FC } from 'react';
import style from './Contact.module.css';

interface ContactProps {
  userName: string;
  isActive: boolean;
}

const Contact: FC<{
  userName: ContactProps['userName'];
  isActive: ContactProps['isActive'];
}> = ({ userName, isActive }) => (
  <div className={`${style.contact} ${isActive ? style.active : ''}`}>
    <img
      className={style.contact__avatar}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU"
      alt=""
    />
    <span className={style.contact__name}>{userName}</span>
  </div>
);

export default Contact;
