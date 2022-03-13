import { v4 as uuidv4 } from 'uuid';
import { IPost } from '../../components/Profile/Post/Post';

const SET_POST = 'set-post';
const UPDATE_POST_TEXT = 'update-post-text';

interface Action {
  type: string;
}
export interface ActionSetPost extends Action {
  post: IPost;
}

export interface ActionUpdatePostText extends Action {
  message?: string;
}

export const setPostActionCreator = () => ({
  type: SET_POST,
});

export const updatePostActionCreator = (message: string) => ({
  message,
  type: UPDATE_POST_TEXT,
});

const initialState = {
  posts: [] as IPost[],
  newPostText: '',
};

const ProfileReducer = (
  state: any = initialState,
  action: ActionSetPost | ActionUpdatePostText = {} as ActionSetPost, // ADD THIS DEFAULT PARAMETER FOR ACTION BECAUSE TS COMPLAINS THAT DEFAULT PARAMETER FOR STATE SHOULD BE LAST IN THE LIST.
) => {
  const userState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
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
      return userState;
    case UPDATE_POST_TEXT:
      userState.newPostText = (action as ActionUpdatePostText).message;
      return userState;
    default:
      return userState;
  }
};

export default ProfileReducer;
