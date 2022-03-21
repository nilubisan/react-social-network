import React, { FC, useRef } from 'react';
import { Post, IPost } from '../Post/Post';
import style from './Posts.module.css';

interface IPosts {
  username: string;
  posts: IPost[];
  onPostMessageUpdate: (_message: string) => void;
  onSendPostMessage: () => void;
}

const Posts: FC<{
  username: IPosts['username'];
  posts: IPosts['posts'];
  onPostMessageUpdate: IPosts['onPostMessageUpdate'];
  onSendPostMessage: IPosts['onSendPostMessage'];
  newPostText: string;
}> = ({
  username,
  posts,
  onPostMessageUpdate,
  onSendPostMessage,
  newPostText,
}) => {
  const inputEl = useRef(null);
  return (
    <div className="posts">
      <div className="posts__create-post">
        <img
          className={style.avatar}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU"
          alt=""
        />
        <textarea
          name=""
          id=""
          cols={30}
          rows={2}
          placeholder={`What's new, ${username}`}
          ref={inputEl}
          onChange={() => onPostMessageUpdate(inputEl.current.value)}
          value={newPostText}
        />
        <button type="submit" onClick={onSendPostMessage}>
          Add post
        </button>
      </div>
      <div className="posts-wrapper">
        {posts.map((el) => (
          <Post
            key={el.postID}
            postID={el.postID}
            postDate={el.postDate}
            postMessage={el.postMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
