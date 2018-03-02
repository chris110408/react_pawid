

import { message } from 'antd'
import {USER_TYPE_GUEST} from './CONSTANTS'
import { call,put, takeLatest, all, fork, select } from 'redux-saga/effects';

import { push } from 'react-router-redux';
import { requestLogin } from './service/api';
import { LOCATION_CHANGE } from 'react-router-redux';
import { INIT_LOGIN_IN, INIT_LOGIN_OUT, login, logout } from './containers/Login/model/actions';

const userFactory = (usertype, username, usertoken) => ({ usertype, username, token: usertoken });

const getType = state => state.getIn(['user', 'userinfo', 'usertype']);

const loading = () => {
    message.info('loading state',1);
};
function* resetUserState() {
  const _usertype = yield select(getType);
  if (_usertype == '') {
    yield call(loading)
    const _localusertype = yield localStorage.getItem('usertype');
    const usertype = _localusertype ? _localusertype : USER_TYPE_GUEST;

    const _localusername = yield localStorage.getItem('username');
    const username = _localusername ? _localusername : 'na';

    const _localusertoken = yield localStorage.getItem('usertoken');
    const usertoken = _localusertoken ? _localusertoken : 'na';
    yield put(login(userFactory(usertype, username, usertoken)));
  }
}

export function* locationWatcher() {
  yield takeLatest(LOCATION_CHANGE, resetUserState);
}

function* root() {
  yield all([fork(locationWatcher)]);
}

export default root;
