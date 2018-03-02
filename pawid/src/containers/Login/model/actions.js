/**
 * Created by leichen on 10/02/2018.
 */

export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const INIT_LOGIN_IN = 'INIT_LOGIN_IN';
export const INIT_LOGIN_OUT = 'INIT_LOGIN_OUT';


export const initlogin= (values) => {
    return { type: INIT_LOGIN_IN, payload: values }
}

export const  initLogout =() => {
    return { type: INIT_LOGIN_OUT }
}

export const login= (values) => {
    return { type: USER_LOGGED_IN, payload: values }
}

export const logout= () => {
    return { type: USER_LOGGED_OUT }
}