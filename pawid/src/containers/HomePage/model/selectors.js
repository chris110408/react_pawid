import { createSelector } from 'reselect';

const LoginSelector = state => state.get('user');

const typelector = () =>
  createSelector(LoginSelector, loginState => {

    if(loginState){
        const usertype = loginState.get('userInfo').get('usertype');
        return usertype? usertype : 'guest'
    }
  });



export { LoginSelector, typelector };
