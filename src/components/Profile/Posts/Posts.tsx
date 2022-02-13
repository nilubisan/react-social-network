import React from 'react';
import Post from '../Post/Post';

const Posts = () => (
  <div className="content__wall-posts">
    <div className="new-post">Create post</div>
    <div className="posts-wrapper">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  </div>
);

export default Posts;
