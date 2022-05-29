import { RootState } from '../../redux/redux';

export const selectMessages = (state: RootState) => state.dialog.messages;
export const selectUsers = (state: RootState) => state.dialog.users;
