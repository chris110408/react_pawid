import { call, put, all, takeLatest, takeEvery,select } from 'redux-saga/effects';
import { INIT_SIGNUP_USER, setSignupError, setBtnLoading, CONFIRMATION, verifyConfirmation } from './actions';
import { push } from 'react-router-redux';
import injectSaga from '../../../utils/injectSaga';
import { signupUser, setConfirmation } from '../../../service/api';
import { DAEMON } from '../../../utils/constants';
import {login} from "../../Login/model/actions";
import {setLocalStorage} from "../../Login/model/sagas";
import {selectUserType} from './selectors'
import { USER_TYPE_REG, USER_TYPE_GUEST, USER_TYPE_CONFIRMED } from '../../../CONSTANTS';
import { message } from 'antd';

const success = () => {
    message.success('This is a message of success');
};

const error = (errors) => {
    message.error(errors);
};



export function* sagaSignup(action) {
  const response = yield call(signupUser, action.payload);

  if (response.errors) {
    yield all([
      put(setSignupError({ error: response.errors.username.message, status: 'error' })),
      put(setBtnLoading(false))
    ]);

  }
    console.log(response)
    yield put(login(response));
    yield all([call(setLocalStorage, response), put(push('/dashboard'))]);
}

export function* signupWatcher() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeEvery(INIT_SIGNUP_USER, sagaSignup);
}

export function* sagaConfirmation(action) {
  console.log(action.payload);
  const response = yield call(setConfirmation, { confirmToken: action.payload });
  console.log(response)
    if(response.errors){
       const _usertype = yield select(selectUserType)
        if (_usertype == USER_TYPE_GUEST){
            yield all([put(push('/login')),call(error,'please login then confirm your email')])
        }else{
            yield all([ put(push('/dashboard')), call(error,response.errors)])
        }

    }else{
        console.log(response.username)
        if(response.username){
            yield put(login(response));
            yield all([call(setLocalStorage, response), put(push('/dashboard')),call(success)]);
        }

    }

}

export function* confirmationWatcher() {
  yield takeEvery(CONFIRMATION, sagaConfirmation);
}

export const withSaga = injectSaga({ key: 'signup', saga: signupWatcher, mode: DAEMON });
export const withConfirmSaga = injectSaga({ key: 'confirmation', saga: confirmationWatcher, mode: DAEMON });
