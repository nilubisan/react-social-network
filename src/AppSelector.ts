import { RootState } from './redux/redux';

const selectIsInitialized = (state: RootState) => state.appData.isInitialized;
export default selectIsInitialized;
