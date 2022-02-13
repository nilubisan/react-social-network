import React from 'react';
import style from './Post.module.css';

const Post = () => (
  <div className={style.post}>
    <img
      className={style.avatar}
      src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
      alt=""
    />
    <p className={style.post__message}> Post message </p>
  </div>
);

export default Post;
