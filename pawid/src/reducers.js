/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS, setIn, getIn } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './containers/Login/model/actions';
import { RESET_USERNAME } from './containers/ResetPassword/model/actions';
import { USER_TYPE_GUEST, MESSAGE_MAP } from './CONSTANTS';
import { SET_MESSAGE } from './containers/MessagePage/model/actions';
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */
const { message } = MESSAGE_MAP;
// The initial state of the App
const initialState = fromJS({
  userinfo: {
    usertype: '',
    username: 'na',
    usertoken: 'na'
  },
  message
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return state
        .setIn(['userinfo', 'usertype'], action.payload.usertype)
        .setIn(['userinfo', 'username'], action.payload.username)
        .setIn(['userinfo', 'usertoken'], action.payload.token);
    case USER_LOGGED_OUT:
      return state
        .setIn(['userinfo', 'usertype'], USER_TYPE_GUEST)
        .setIn(['userinfo', 'username'], 'na')
        .setIn(['userinfo', 'usertoken'], 'na');
    case SET_MESSAGE:
      return state
        .setIn(['message', 'title'], action.payload.title)
        .setIn(['message', 'status'], action.payload.status)
        .setIn(['message', 'description'], action.payload.description);
    default:
      return state;
  }
};

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    routerReducer,
    user: userReducer,
    ...injectedReducers
  });
}
