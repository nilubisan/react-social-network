import React, { FC } from 'react';
import styles from './UserPic.module.css';

const UserPic: FC<{ imgSrc: string }> = ({ imgSrc }) => (
  <img src={imgSrc} className={styles.userpic} alt="" />
);

export default UserPic;
