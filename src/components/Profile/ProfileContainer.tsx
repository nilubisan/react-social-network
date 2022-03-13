import { connect } from 'react-redux';
import Profile from './Profile';
import {
  ActionSetPost,
  ActionUpdatePostText,
  setPostActionCreator,
  updatePostActionCreator,
} from '../../redux/reducers/profile-reducer';

const mapStateToProps = (state: any) => ({
  posts: state.profile.posts,
  newPostText: state.profile.newPostText,
});

const mapDispatchToProps = (
  dispatch: (_action: ActionSetPost | ActionUpdatePostText) => void,
) => ({
  onPostMessageUpdate: (message: string) => {
    dispatch(updatePostActionCreator(message));
  },
  onSendPostMessage: () => {
    dispatch(setPostActionCreator());
  },
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
