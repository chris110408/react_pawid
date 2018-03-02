/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { INIT_VERIFY_TOKEN,RESET_PASSWORD, initVerifyToken,resetUsername } from './actions';
import { push } from 'react-router-redux';
import injectSaga from '../../../utils/injectSaga';
import { requestVerifyToken,requestResetPassword } from '../../../service/api';
import { DAEMON } from '../../../utils/constants';
import { message } from 'antd';
import {login} from "../../Login/model/actions";
import {USER_TYPE_GUEST} from '../../../CONSTANTS'
import {  notification } from 'antd';


const messageMap ={
    error:{
        message: 'can not reset your password',
        description: 'Sorry we can not reset your password',
    },
    success:{
        message: 'Your password has successfully reseted',
        description: 'Please login to your account with your new password',
    }


}


const openNotificationWithIcon = (type,option) => {

    const  message = messageMap[type]

    if(option){
        notification[type](option);
    }else{
        notification[type](message);
    }

};


const success = () => {
    message.success('This is a message of success');
};

const error = (errors) => {
    message.error(errors);
};





export function* verifyToken(action) {

   yield console.log(action)
    const response = yield call(requestVerifyToken, {token:action.payload});
    if (response.errors) {
        yield all([call(openNotificationWithIcon, 'error',response.errors), put(push('/login'))]);
    }else{
        yield put(login({username:response,usertype:USER_TYPE_GUEST, token:'na'}))
    }

}





export function* verifyTokenWatcher() {
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(INIT_VERIFY_TOKEN, verifyToken);
}



export function* resetPassword(action) {


    const response = yield call(requestResetPassword, {userinfo:action.payload});
        if(response=='success'){
            yield all([call(openNotificationWithIcon, 'success'), put(push('/login'))]);
        }else{
            yield call(openNotificationWithIcon, 'error');
        }


}


export function* resetPasswordWatcher() {
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(RESET_PASSWORD, resetPassword);
}


export default function* root() {
    yield all([fork(resetPasswordWatcher), fork(verifyTokenWatcher)]);
}



export const withSaga = injectSaga({ key: 'reset_password', saga: root, mode: DAEMON });
