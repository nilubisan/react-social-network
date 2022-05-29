import { AnyAction } from 'redux';

const SET_INITIALIZED = 'SET-INITIALIZED';

export const setInitializedAC = () => ({ type: SET_INITIALIZED });

const initialState = {
  isInitialized: false,
};

const AppReducer = (state = initialState, action = {} as AnyAction) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_INITIALIZED:
      newState.isInitialized = true;
      break;
    default:
      return state;
  }
  return newState;
};

export default AppReducer;
