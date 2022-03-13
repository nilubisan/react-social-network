import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import {
  setPostActionCreator,
  updatePostActionCreator,
} from '../../redux/reducers/profile-reducer';

const ProfileContainer = () => {
  const profileProps = useSelector((state: any) => ({
    posts: state.profile.posts,
    newPostText: state.profile.newPostText,
  }));

  const dispatch = useDispatch();

  const onPostMessageUpdate = (message: string) => {
    dispatch(updatePostActionCreator(message));
  };
  const onSendPostMessage = () => {
    dispatch(setPostActionCreator());
  };

  return (
    <Profile
      posts={profileProps.posts}
      newPostText={profileProps.newPostText}
      onPostMessageUpdate={onPostMessageUpdate}
      onSendPostMessage={onSendPostMessage}
    />
  );
};

export default ProfileContainer;
