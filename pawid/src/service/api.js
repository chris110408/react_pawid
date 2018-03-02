/**
 * Created by leichen on 12/02/2018.
 */
import request from '../utils/request';


export async function requestLogin(params) {

    return request('/myapi/auth', {
        method: 'POST',
        body: params
    });
}


export async function requestVerifyEmil(params) {

    return request('/myapi/auth/verify_email', {
        method: 'POST',
        body: params
    });
}

export async function requestVerifyToken(params) {

    return request('/myapi/auth/verify_token', {
        method: 'POST',
        body: params
    });
}


export async function requestResetPassword(params) {

    return request('/myapi/auth/reset_password', {
        method: 'POST',
        body: params
    });
}




export async function signupUser(params) {

    return request('/myapi/signup', {
        method: 'POST',
        body: params
    });
}




export async function setConfirmation(params) {

    return request('/myapi/signup/confirm', {
        method: 'POST',
        body: params
    });
}



