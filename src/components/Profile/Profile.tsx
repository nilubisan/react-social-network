import React, { FC } from 'react';
import Bio from '../Bio/Bio';
import Posts from './Posts/Posts';
import style from './Profile.module.css';
import background from '../../images/background.jpg';
import { IPost } from './Post/Post';
import {
  ActionSetPost,
  ActionUpdatePostText,
} from '../../redux/reducers/profile-reducer';

interface IProfile {
  posts: IPost[];
  newPostText: string;
  dispatch: (_action: ActionSetPost | ActionUpdatePostText) => void;
}

const Profile: FC<{
  posts: IProfile['posts'];
  dispatch: IProfile['dispatch'];
  newPostText: IProfile['newPostText'];
}> = ({ posts, dispatch, newPostText }) => (
  <div className={style.content}>
    <div className={style['content__back-img-wrapper']}>
      <img className={style['content__back-img']} src={background} alt="" />
    </div>
    <Bio />
    <Posts
      username="Rinat"
      posts={posts}
      dispatch={dispatch}
      newPostText={newPostText}
    />
  </div>
);

export default Profile;
