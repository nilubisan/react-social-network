import React, { FC, useRef } from 'react';
import { Post, IPost } from '../Post/Post';
import style from './Posts.module.css';
import {
  ActionSetPost,
  ActionUpdatePostText,
  setPostActionCreator,
  updatePostActionCreator,
} from '../../../reducers/profile-reducer';

interface IPosts {
  username: string;
  posts: IPost[];
  dispatch: (_action: ActionSetPost | ActionUpdatePostText) => void;
}

const Posts: FC<{
  username: IPosts['username'];
  posts: IPosts['posts'];
  dispatch: IPosts['dispatch'];
  newPostText: string;
}> = ({ username, posts, dispatch, newPostText }) => {
  const inputEl = useRef(null);
  const onTextAreaSubmit = () => {
    if (inputEl.current.value !== '') dispatch(setPostActionCreator());
  };
  return (
    <div className="posts">
      <div className="posts__create-post">
        <img
          className={style.avatar}
          src="https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg"
          alt=""
        />
        <textarea
          name=""
          id=""
          cols={30}
          rows={2}
          placeholder={`What's new, ${username}`}
          ref={inputEl}
          onChange={() =>
            dispatch(updatePostActionCreator(inputEl.current.value))
          }
          value={newPostText}
        />
        <button type="submit" onClick={onTextAreaSubmit}>
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
