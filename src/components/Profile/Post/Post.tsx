import React, {FC} from 'react';
import style from './Post.module.css';

const Post:FC<{postMessage: string}>  = ({postMessage}) => (
  <div className={style.post}>
    <img
      className={style.avatar}
      src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
      alt=""
    />
    <p className={style.post__message}> {postMessage} </p>
  </div>
);

export default Post;
