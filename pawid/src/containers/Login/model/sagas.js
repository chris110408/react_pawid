/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { INIT_LOGIN_IN, INIT_LOGIN_OUT, login, logout } from './actions';
import { push } from 'react-router-redux';
import injectSaga from '../../../utils/injectSaga';
import { requestLogin } from '../../../service/api';
import { DAEMON } from '../../../utils/constants';

export const setLocalStorage = data => {

    localStorage.setItem("usertoken", data.token);
    localStorage.setItem("usertype", data.usertype);
    localStorage.setItem("username", data.username);

};

const removeLocalStorage = () => {
  localStorage.removeItem('usertoken');
  localStorage.removeItem('usertype');
  localStorage.removeItem('username');
};

/**
 * Github repos request/response handler
 */

export function* loginUser(action) {
  const response = yield call(requestLogin, action.payload);

  if (response) {
    yield put(login(response));
    yield all([call(setLocalStorage, response), put(push('/dashboard'))]);
  }
}

export function* logoutUser() {

  if (localStorage.getItem('usertoken')) {
      yield all([call(removeLocalStorage), yield put(logout()),yield put(push('/login'))]);
  }
  yield put(logout());
  yield put(push('/login'));
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loginWatcher() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(INIT_LOGIN_IN, loginUser);
}

export function* logoutWatcher() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(INIT_LOGIN_OUT, logoutUser);
}



export default function* root() {
  yield all([fork(loginWatcher), fork(logoutWatcher)]);
}

export const withSaga = injectSaga({ key: 'user', saga: root, mode: DAEMON });
