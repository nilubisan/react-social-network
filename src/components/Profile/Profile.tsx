import React, { FC } from 'react';

import Contacts from './Contacts/Contacts';
import UserPic from './UserPic/UserPic';
import Status from './Status/Status';
import style from './Profile.module.css';
import { DEFAULT_AVATAR_URL } from '../../helpers/api';

export interface IUserProfile {
  aboutMe: string;
  status: string;
  contacts: {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: string;
  photos: {
    small: string;
    large: string;
  };
}

const checkIfAnyContactsSpecified = (contactsList: string[]) =>
  !Object.values(contactsList).every((el) => el === null);

const Profile: FC<{ profileData: IUserProfile }> = ({ profileData }) => {
  const {
    aboutMe,
    status,
    contacts,
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    userId,
    photos,
  } = profileData;
  return (
    <div id={userId}>
      <div className={style.profile__bio}>
        <UserPic imgSrc={photos.small ? photos.small : DEFAULT_AVATAR_URL} />
        <p className={style.profile__username}>{fullName}</p>
        <p className="profile__subtitle">{aboutMe}</p>
        <Status statusText={status} />

        {lookingForAJob ? <p>{lookingForAJobDescription}</p> : null}
      </div>
      {checkIfAnyContactsSpecified(Object.values(contacts)) ? (
        <Contacts contacts={contacts} />
      ) : null}
    </div>
  );
};

export default Profile;
