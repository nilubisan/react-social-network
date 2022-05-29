import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnyAction } from 'redux';
import { IPost } from '../../components/Profile/Post/Post';
import { IUserProfile } from '../../components/Profile/Profile';
import {
  SET_POST,
  UPDATE_POST_TEXT,
  SET_PROFILE,
  IS_LOADING,
  SET_STATUS,
  IS_PROFILE_EMPTY,
} from '../../helpers/constants';
import { apiService } from '../../helpers/api';

// **********************************ACTION CREATORS********************************************

export const setProfileAC = (userProfile: IUserProfile, userStatus: string) => {
  const profile = { ...userProfile };
  profile.status = userStatus;
  return {
    type: SET_PROFILE,
    profile,
  };
};

export const setStatusActionCreator = (status: string) => ({
  type: SET_STATUS,
  status,
});

export const setProfileStatus =
  (status: string) => (dispatch: Dispatch<AnyAction>) => {
    apiService
      .setStatus(status)
      .then(() => dispatch(setStatusActionCreator(status)));
  };

export const setPostActionCreator = () => ({
  type: SET_POST,
});

export const updatePostActionCreator = (message: string) => ({
  message,
  type: UPDATE_POST_TEXT,
});

export const toggleIsLoadingProfileAC = (isLoading: boolean) => ({
  isLoading,
  type: IS_LOADING,
});

const toggleIsProfileEmptyAC = (isProfileEmpty: boolean) => ({
  isProfileEmpty,
  type: IS_PROFILE_EMPTY,
});

// ***********************************REDUX THUNK********************************************************

export const setProfile = (userId: number) =>
  function setProfileThunk(dispatch: Dispatch<AnyAction>) {
    if (userId) {
      dispatch(toggleIsLoadingProfileAC(true));
      apiService.getProfile(userId).then((userProfile) => {
        apiService.getUserStatus(userId).then((userStatus) => {
          dispatch(setProfileAC(userProfile, userStatus));
          dispatch(toggleIsProfileEmptyAC(false));
          dispatch(toggleIsLoadingProfileAC(false));
        });
      });
    }
  };

// ************************************************REDUCER***************************************************

const initialState = {
  posts: [] as IPost[],
  newPostText: '',
  currentProfile: {
    aboutMe: '',
    contacts: {},
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    userId: '',
    photos: {
      small: '',
      large: '',
    },
  },
  isLoading: false,
  isProfileEmpty: true,
};

const ProfileReducer = (state = initialState, action = {} as AnyAction) => {
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_PROFILE:
      userState.currentProfile = action.profile;
      break;
    case SET_POST:
      userState.posts = [
        ...userState.posts,
        {
          postID: uuidv4(),
          postDate: new Date(),
          postMessage: userState.newPostText,
        },
      ];
      userState.newPostText = '';
      break;
    case SET_STATUS:
      userState.currentProfile.status = action.status;
      break;
    case UPDATE_POST_TEXT:
      userState.newPostText = action.message;
      break;
    case IS_LOADING:
      userState.isLoading = action.isLoading;
      break;
    case IS_PROFILE_EMPTY:
      userState.isProfileEmpty = action.isProfileEmpty;
      break;
    default:
      return state;
  }
  return userState;
};

export default ProfileReducer;
