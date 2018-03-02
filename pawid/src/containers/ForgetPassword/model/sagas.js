

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { INIT_VERIFY, initVerify } from './actions';
import { push } from 'react-router-redux';
import injectSaga from '../../../utils/injectSaga';
import { requestVerifyEmil } from '../../../service/api';
import { DAEMON } from '../../../utils/constants';
import {  notification } from 'antd';


const messageMap ={
    error:{
        message: 'Can not find your email',
        description: 'Sorry We can not locate your email in our database. please go to our sign up page to sign up',
    },
    success:{
        message: 'an email of reset password has already been resent',
        description: 'Please check your email and click the link to reset your password',
    }

}


const openNotificationWithIcon = (type) => {
    let message
    if(type=='error'){
         message = messageMap.error
    }else{
         message = messageMap.success
    }

    notification[type](message);
};

export function* verifyEmail(action) {


    const response = yield call(requestVerifyEmil, action.payload);

    if (response.verifed) {
       yield call(openNotificationWithIcon,'success')
    }else{
        yield call(openNotificationWithIcon,'error')
    }
}


/**
 * Root saga manages watcher lifecycle
 */
export function* verifyWatcher() {
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(INIT_VERIFY, verifyEmail);
}





export const withSaga = injectSaga({ key: 'verify', saga: verifyWatcher, mode: DAEMON });
