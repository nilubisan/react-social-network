import React, { FC } from 'react';
import Profile from './Profile';
import {
  setPostActionCreator,
  updatePostActionCreator,
} from '../../redux/reducers/profile-reducer';

import { IStore } from '../../redux/store';

const ProfileContainer: FC<{ store: IStore }> = ({ store }) => {
  const state = store.getState();
  const onPostMessageUpdate = (message: string) => {
    store.dispatch(updatePostActionCreator(message));
  };
  const onSendPostMessage = () => {
    store.dispatch(setPostActionCreator());
  };
  return (
    <Profile
      posts={state.profile.posts}
      newPostText={state.profile.newPostText}
      onPostMessageUpdate={onPostMessageUpdate}
      onSendPostMessage={onSendPostMessage}
    />
  );
};

export default ProfileContainer;
