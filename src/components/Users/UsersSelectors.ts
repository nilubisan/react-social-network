import { RootState } from '../../redux/redux';

export const selectUsersList = (state: RootState) => state.users.usersList;
export const selectActivePageNumber = (state: RootState) =>
  state.users.activePageNumber;
export const selectTotalAmount = (state: RootState) => state.users.totalAmount;
export const selectIsFetchingUsersListInProgress = (state: RootState) =>
  state.users.isLoading;
export const selectFollowingInProgressUsers = (state: RootState) =>
  state.users.followingInProgressUsers;
export const selectKeyword = (state: RootState) => state.users.keyword;
export const selectPageSize = (state: RootState) => state.users.pageSize;
export const selectDisplayedUsersCategory = (state: RootState) =>
  state.users.usersCategoryToDisplay;
