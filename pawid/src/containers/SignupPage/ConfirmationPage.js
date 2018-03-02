import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { branch, renderComponent, lifecycle, renderNothing, withProps } from 'recompose';
import { Redirect } from 'react-router-dom';
import { withConfirmSaga } from './model/sagas';
import { verifyConfirmation } from './model/actions';
import {selectUserType} from './model/selectors'
import { USER_TYPE_REG, USER_TYPE_GUEST, USER_TYPE_CONFIRMED } from '../../CONSTANTS';
import { push } from 'react-router-redux';

const RedirectToHomePage = withProps({ to: '/' })(Redirect);
const RedirectToDashBoard = withProps({ to: '/' })(Redirect);



const emptyPage = props => {};

const isConfrimValid = props => {

  const confirmToken =  props.match.params.id
  if (confirmToken) {
    props.dispatch(verifyConfirmation(confirmToken));
    return true;
  }
  return false;
};

const mapStateToProps = state => ({
  usertype:selectUserType(state)
});

export default compose(
  withConfirmSaga,
  connect(mapStateToProps),
  branch(isConfrimValid, renderNothing, renderComponent(RedirectToHomePage))
)(emptyPage);
