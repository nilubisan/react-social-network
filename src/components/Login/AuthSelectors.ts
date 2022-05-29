import { RootState } from '../../redux/redux';

export const selectIsAuthStatus = (state: RootState) => state.authData.isAuth;
export const selectId = (state: RootState) => state.authData.id;
