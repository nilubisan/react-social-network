import React, { FC } from 'react';
import Bio from '../Bio/Bio';
import Posts from './Posts/Posts';
import style from './Profile.module.css';
import background from '../../images/background.jpg';
import { IPost } from './Post/Post';

interface IProfile {
  posts: IPost[];
  newPostText: string;
  onPostMessageUpdate: (_message: string) => void;
  onSendPostMessage: () => void;
}

const Profile: FC<{
  posts: IProfile['posts'];
  newPostText: IProfile['newPostText'];
  onPostMessageUpdate: IProfile['onPostMessageUpdate'];
  onSendPostMessage: IProfile['onSendPostMessage'];
}> = ({ posts, onPostMessageUpdate, onSendPostMessage, newPostText }) => (
  <div className={style.content}>
    <div className={style['content__back-img-wrapper']}>
      <img className={style['content__back-img']} src={background} alt="" />
    </div>
    <Bio />
    <Posts
      username="Rinat"
      posts={posts}
      newPostText={newPostText}
      onPostMessageUpdate={onPostMessageUpdate}
      onSendPostMessage={onSendPostMessage}
    />
  </div>
);

export default Profile;
