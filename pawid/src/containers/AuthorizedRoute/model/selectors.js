import { createSelector } from 'reselect';

const LoginSelector = state => state.get('route');

const userselector = () =>
    createSelector(LoginSelector, loginState => {

        if(loginState){
            const userinfo = loginState.get('location');
            return userinfo.token? userinfo : {}
        }
    });



export { LoginSelector, userselector };