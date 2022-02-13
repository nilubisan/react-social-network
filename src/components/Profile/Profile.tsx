import React from 'react';
import Bio from '../Bio/Bio';
import Posts from '../Posts/Posts';
import './Profile.css';
import background from '../../images/background.jpg';

const Profile = () => (
  <div className="content">
    <div className="content__back-img-wrapper">
      <img className="content__back-img" src={background} alt="" />
    </div>
    <Bio />
    <Posts />
  </div>
);

export default Profile;
