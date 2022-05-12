import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

interface Action {
  type: string;
}

export interface ActionSetPost extends Action {
  post: IPost;
}

export interface ActionSetStatus extends Action {
  status: string;
}

export interface ActionUpdatePostText extends Action {
  message?: string;
}

export interface ActionSetProfile extends Action {
  profile: IUserProfile;
}

export interface ActionSetIsLoading extends Action {
  isLoading: boolean;
}
export interface ActionToggleIsProfileEmpty extends Action {
  isProfileEmpty: boolean;
}

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
  (status: string) => (dispatch: Dispatch<any>) => {
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

export const setProfile = (userId: string) =>
  function (dispatch: Dispatch<any>) {
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

const ProfileReducer = (
  state: any = initialState,
  action: ActionSetPost | ActionUpdatePostText | ActionSetProfile = {} as any, // ADD THIS DEFAULT PARAMETER FOR ACTION BECAUSE TS COMPLAINS THAT DEFAULT PARAMETER FOR STATE SHOULD BE LAST IN THE LIST.
) => {
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_PROFILE:
      userState.currentProfile = (action as ActionSetProfile).profile;
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
      userState.currentProfile.status = (action as ActionSetStatus).status;
      break;
    case UPDATE_POST_TEXT:
      userState.newPostText = (action as ActionUpdatePostText).message;
      break;
    case IS_LOADING:
      userState.isLoading = (action as ActionSetIsLoading).isLoading;
      break;
    case IS_PROFILE_EMPTY:
      userState.isProfileEmpty = (
        action as ActionToggleIsProfileEmpty
      ).isProfileEmpty;
      break;
    default:
      return state;
  }
  return userState;
};

export default ProfileReducer;
