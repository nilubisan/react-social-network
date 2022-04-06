import { v4 as uuidv4 } from 'uuid';
import { IPost } from '../../components/Profile/Post/Post';
import { IUserProfile } from '../../components/Profile/Profile';
import {
  SET_POST,
  UPDATE_POST_TEXT,
  SET_PROFILE,
  IS_LOADING,
} from '../../helpers/constants';

interface Action {
  type: string;
}

export interface ActionSetPost extends Action {
  post: IPost;
}

export interface ActionUpdatePostText extends Action {
  message?: string;
}

export interface ActionSetProfile extends Action {
  userProfile: IUserProfile;
}

export interface ActionSetIsLoading extends Action {
  isLoading: boolean;
}

export const setProfileAC = (userProfile: IUserProfile) => ({
  type: SET_PROFILE,
  userProfile,
});

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

const initialState = {
  posts: [] as IPost[],
  newPostText: '',
  currentProfile: {
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
  },
  isLoading: false,
};

const ProfileReducer = (
  state: any = initialState,
  action: ActionSetPost | ActionUpdatePostText | ActionSetProfile = {} as any, // ADD THIS DEFAULT PARAMETER FOR ACTION BECAUSE TS COMPLAINS THAT DEFAULT PARAMETER FOR STATE SHOULD BE LAST IN THE LIST.
) => {
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_PROFILE:
      userState.currentProfile = (action as ActionSetProfile).userProfile;
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
    case UPDATE_POST_TEXT:
      userState.newPostText = (action as ActionUpdatePostText).message;
      break;
    case IS_LOADING:
      userState.isLoading = (action as ActionSetIsLoading).isLoading;
      break;
    default:
      return state;
  }
  return userState;
};

export default ProfileReducer;
