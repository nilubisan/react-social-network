import React from 'react';
import Bio from '../Bio/Bio';
import Posts from '../Posts/Posts';
import style from './Profile.module.css';
import background from '../../images/background.jpg';

const Profile = () => (
  <div className={style.content}>
    <div className={style['content__back-img-wrapper']}>
      <img className={style['content__back-img']} src={background} alt="" />
    </div>
    <Bio />
    <Posts />
  </div>
);

export default Profile;
