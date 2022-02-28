import React, {FC, useState, useRef} from 'react';
import Post from '../Post/Post';
import style from './Posts.module.css';

const Posts: FC<{username: string}> = ({ username }) => {
  const [posts, setPost] = useState([]);
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    
    if(inputEl.current.value !== '') setPost((currentPosts) => [...currentPosts, inputEl.current.value]);
  }
  return (
  <div className="posts">
    <div className="posts__create-post">
      <img className={style.avatar} src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg" alt="" />
      <textarea name="" id="" cols={30} rows={2} placeholder={`What's new, ${username}`} ref={inputEl}/>
      <button type='submit' onClick={onTextAreaSubmit}>Add post</button>
    </div>
    <div className="posts-wrapper">
      {posts.map((el) =>
        <Post postMessage={el}/>
      )}
    </div>
  </div> )
};

export default Posts;
