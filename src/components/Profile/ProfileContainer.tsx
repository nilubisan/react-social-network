import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import Preloader from '../Preloader/Preloader';
import { setProfile } from '../../redux/reducers/profile-reducer';
import {
  selectCurrentProfile,
  selectIsProfileFetchingInProgress,
  selectIsProfileEmpty,
} from './ProfileSelectors';
import { selectId } from '../Login/AuthSelectors';
import AuthRedirect from '../../hoc/AuthRedirect';

const ProfileContainer: FC<{}> = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector(selectCurrentProfile);
  const isLoading = useSelector(selectIsProfileFetchingInProgress);
  const id = useSelector(selectId);
  const isProfileEmpty = useSelector(selectIsProfileEmpty);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(setProfile(userId !== undefined ? userId : id));
  }, [userId]);
  return isLoading || isProfileEmpty ? (
    <Preloader />
  ) : (
    <Profile profileData={currentProfile} />
  );
};

export default AuthRedirect(ProfileContainer);
