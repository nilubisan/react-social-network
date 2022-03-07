import React, { FC } from 'react';
import Bio from '../Bio/Bio';
import Posts from './Posts/Posts';
import style from './Profile.module.css';
import background from '../../images/background.jpg';
import { IPost } from './Post/Post';

const Profile: FC<{ posts: IPost[]; setPost: (_post: IPost) => void }> = ({
  posts,
  setPost,
}) => (
  <div className={style.content}>
    <div className={style['content__back-img-wrapper']}>
      <img className={style['content__back-img']} src={background} alt="" />
    </div>
    <Bio />
    <Posts username="Rinat" posts={posts} setPost={setPost} />
  </div>
);

export default Profile;
