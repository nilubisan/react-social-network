export const selectCurrentProfile = (state: any) =>
  state.profile.currentProfile;
export const selectIsProfileFetchingInProgress = (state: any) =>
  state.profile.isLoading;
export const selectIsProfileEmpty = (state: any) =>
  state.profile.isProfileEmpty;
