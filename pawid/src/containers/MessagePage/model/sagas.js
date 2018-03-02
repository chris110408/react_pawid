import { call, put, all, takeLatest, takeEvery,select } from 'redux-saga/effects';
import { UNMOUNT_PAGE,setMessage } from './actions';
import { push } from 'react-router-redux';
import injectSaga from '../../../utils/injectSaga';

import { DAEMON } from '../../../utils/constants';
import {} from './selectors'
import { MESSAGE_MAP } from '../../../CONSTANTS';

const {message} =MESSAGE_MAP




export function* setMessageSaga(action) {
    yield put(setMessage(message))
}

export function* messageWatcher() {

    yield takeEvery(UNMOUNT_PAGE, setMessageSaga);
}


export const withSaga = injectSaga({ key: 'message_page', saga: messageWatcher, mode: DAEMON });

