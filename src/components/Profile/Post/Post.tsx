import React, { FC } from 'react';
import style from './Post.module.css';

export interface IPost {
  postID: string;
  postDate: Date;
  postMessage: string;
}

export const Post: FC<{
  postID: IPost['postID'];
  postDate: IPost['postDate'];
  postMessage: IPost['postMessage'];
}> = ({ postID, postDate, postMessage }) => (
  <div key={postID} className={style.post}>
    <img
      className={style.avatar}
      src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
      alt=""
    />
    <div className={style.post__content}>
      <p className={style.post__message}> {postMessage} </p>
      <p className={style.post__date}>{postDate.toLocaleString()}</p>
    </div>
  </div>
);
