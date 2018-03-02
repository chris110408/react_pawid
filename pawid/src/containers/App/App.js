/**
 * Created by leichen on 11/02/2018.
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../../containers/HomePage/index';
import LoginPage from '../../containers/Login/index';
import UnconfirmedPage from '../../containers/DashBoard/UnconfirmedPage.js';
import { withSaga } from '../../containers/Login/model/sagas';
import ConfirmationPage from '../../containers/SignupPage/ConfirmationPage';
import DashBoardPage from '../../containers/DashBoard';
import ForgetPasswordPage from '../../containers/ForgetPassword/index';
import ResetPasswordPage from '../../containers/ResetPassword';
import MessagePage from '../../containers/MessagePage';

import { withProps } from 'recompose';
import AuthorizedRouter from '../AuthorizedRoute';
import { USER_TYPE_REG, USER_TYPE_GUEST, USER_TYPE_CONFIRMED } from '../../CONSTANTS';
import SignUpPage from '../../containers/SignupPage';
const GuestRoute = withProps({ authority: USER_TYPE_GUEST })(AuthorizedRouter);
const UserRoute = withProps({ authority: USER_TYPE_REG })(AuthorizedRouter);
const ConfirmedRoute = withProps({ authority: USER_TYPE_CONFIRMED })(AuthorizedRouter);

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);
const App = () => {
  return (
    <div>
      <Helmet titleTemplate="%s - pawid" defaultTitle="pawid">
        <meta name="description" content="A pet application" />
      </Helmet>

      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/confirm/:id" component={ConfirmationPage} />
        <Route path="/forget_password" component={ForgetPasswordPage} />
          <Route path="/reset_password/:token" component={ResetPasswordPage} />
        <ConfirmedRoute
          path="/dashboard"
          component={DashBoardPage}
          elseAuthority={USER_TYPE_REG}
          elseComponent={UnconfirmedPage}
        />
          <Route path="/message" component ={MessagePage}/>
      </ConnectedSwitch>
    </div>
  );
};

export default withSaga(App);
