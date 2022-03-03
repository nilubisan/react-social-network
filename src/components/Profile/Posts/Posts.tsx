import React, {FC, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Post, IPost} from '../Post/Post';
import style from './Posts.module.css';

interface IPosts {
  username: string,
  posts: IPost[],
  setPost: (_post: IPost) => void
}

const Posts: FC<{username: IPosts['username'], posts: IPosts['posts'], setPost: IPosts['setPost']}> = ({ username, posts, setPost }) => {
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    if(inputEl.current.value !== '') setPost({
      postID: uuidv4(),
      postDate: new Date(),
      postMessage: inputEl.current.value
    });
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
        <Post key={el.postID} postID={el.postID} postDate={el.postDate} postMessage={el.postMessage}/>
      )}
    </div>
  </div> )
};

export default Posts;
