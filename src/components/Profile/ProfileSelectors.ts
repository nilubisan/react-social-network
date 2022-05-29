import { RootState } from '../../redux/redux';

export const selectCurrentProfile = (state: RootState) =>
  state.profile.currentProfile;
export const selectIsProfileFetchingInProgress = (state: RootState) =>
  state.profile.isLoading;
export const selectIsProfileEmpty = (state: RootState) =>
  state.profile.isProfileEmpty;
