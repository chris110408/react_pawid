// The initial state of the App
import { SET_SIGNUP_ERROR,SET_BTN_LOADING } from './actions';
import { fromJS } from 'immutable';
import injectReducer from '../../../utils/injectReducer';
import { signupWatcher } from './sagas';

const initialState = fromJS({
  visible: false,
  username: { error: '', status: '' },
  btn:{loading:false}
});

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_ERROR:
      return state
        .setIn(['username', 'error'], action.payload.error)
        .setIn(['username', 'status'], action.payload.status)
      case SET_BTN_LOADING:

          return state.setIn(['btn','loading'],action.payload);
    default:
      return state;
  }
};

export const withReducer = injectReducer({ key: 'signup', reducer: signupReducer });
