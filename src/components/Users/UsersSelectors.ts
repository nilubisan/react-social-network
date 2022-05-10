export const selectUsersList = (state: any) => state.users.usersList;
export const selectActivePageNumber = (state: any) => state.users.activePageNumber;
export const selectTotalAmount = (state: any) => state.users.totalAmount;
export const selectIsFetchingUsersListInProgress = (state: any) => state.users.isLoading;
export const selectFollowingInProgressUsers = (state: any) => state.users.followingInProgressUsers;
