import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import Preloader from '../Preloader/Preloader';
import { API_URL } from '../../helpers/api';
import {
  setProfileAC,
  toggleIsLoadingProfileAC,
} from '../../redux/reducers/profile-reducer';

const ProfileContainer: FC<{}> = () => {
  const dispatch = useDispatch();
  const profileProps = useSelector((state: any) => ({
    currentProfile: state.profile.currentProfile,
    isLoading: state.profile.isLoading,
  }));

  const defaultProfile = {
    aboutMe: 'I am a web developer',
    contacts: {
      facebook: 'https://facebook.com/nilubisan',
      website: 'https://nilubisan.com',
      vk: 'https://vk.com/make_it_simply',
      twitter: 'https://twitter',
      instagram: 'https://instagram.com/rinattrinat',
      youtube: 'https://yotube.com',
      github: 'https://github.com/nilubisan',
      mainLink: 'mainlink',
    },
    lookingForAJob: true,
    lookingForAJobDescription: 'I am looking for a job',
    fullName: 'Rinat',
    userId: '5654654',
    photos: {
      small:
        'https://sun1.tele2-kz-oskemen.userapi.com/s/v1/ig1/y783ux46m4ihL-IlQQ1Uy0tdRBuwuO2dbsovcw4pOE0B5AqvIr-nBlByd-r3I-bfghdU61Rk.jpg?size=200x200&quality=96&crop=193,1,651,651&ava=1',
      large:
        'https://sun9-87.userapi.com/impf/c857536/v857536523/ff189/M0tNszzNPHU.jpg?size=844x652&quality=96&sign=9283da1571e423701fb640dcefd42a6c&type=album',
    },
  };

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(toggleIsLoadingProfileAC(true));
      axios.get(`${API_URL}/profile/${userId}`).then((response: any) => {
        dispatch(setProfileAC(response.data));
        dispatch(toggleIsLoadingProfileAC(false));
      });
    }
  }, []);

  return profileProps.isLoading ? (
    <Preloader />
  ) : (
    <Profile
      profileData={userId ? profileProps.currentProfile : defaultProfile}
    />
  );
};

export default ProfileContainer;
