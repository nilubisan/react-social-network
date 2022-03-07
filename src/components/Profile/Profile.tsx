import React, { FC } from 'react';
import Bio from '../Bio/Bio';
import Posts from './Posts/Posts';
import style from './Profile.module.css';
import background from '../../images/background.jpg';
import { IPost } from './Post/Post';
import {
  ActionSetPost,
  ActionCreateMessage,
  ActionUpdateMessageText,
} from '../../state';

interface IProfile {
  posts: IPost[];
  dispatch: (
    _action: ActionSetPost | ActionCreateMessage | ActionUpdateMessageText,
  ) => void;
}

const Profile: FC<{
  posts: IProfile['posts'];
  dispatch: IProfile['dispatch'];
}> = ({ posts, dispatch }) => (
  <div className={style.content}>
    <div className={style['content__back-img-wrapper']}>
      <img className={style['content__back-img']} src={background} alt="" />
    </div>
    <Bio />
    <Posts username="Rinat" posts={posts} dispatch={dispatch} />
  </div>
);

export default Profile;
