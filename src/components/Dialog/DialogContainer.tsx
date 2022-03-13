import { connect } from 'react-redux';
import Dialog from './Dialog';
import {
  createMessageActionCreator,
  updateMessageActionCreator,
  ActionCreateMessage,
  ActionUpdateMessageText,
} from '../../redux/reducers/dialog-reducer';

const mapStateToProps = (state: any) => ({
  // remove any
  users: state.common.users,
  messages: state.dialog.messages,
});

const mapDispatchToProps = (
  dispatch: (_action: ActionCreateMessage | ActionUpdateMessageText) => void,
) => ({
  onMessageInputChange: (messageObj: { message: string; friendID: string }) => {
    const { message, friendID } = messageObj;
    dispatch(
      updateMessageActionCreator({
        message,
        friendID,
      }),
    );
  },
  onMessageInputSubmit: (friendID: string) => {
    dispatch(createMessageActionCreator(friendID));
  },
});

const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);

export default DialogContainer;
