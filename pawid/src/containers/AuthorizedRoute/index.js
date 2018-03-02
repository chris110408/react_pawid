import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Authorized from '../../components/Authorized/Authorized';
import { getIn } from 'immutable';

const RouteAuthorized = ({
  dispatch,
  currentAuth,
  noMatch,
  render,
  authority,
  component: Component,
  elseAuthority = '',
  elseComponent = {},
  ...rest
}) => {
  if (elseAuthority != '' && elseAuthority === currentAuth) {
    currentAuth = authority;
    Component = elseComponent;
  }

  const RedirectRoute = noMatch ? noMatch : <Redirect to="/" />;
  return (
    <Authorized authority={authority} currentAuth={currentAuth} noMatch={RedirectRoute}>
      <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
    </Authorized>
  );
};

const mapStateToProps = state => {
  return { currentAuth: state.getIn(['user', 'userinfo', 'usertype']) };
};

export default connect(mapStateToProps)(RouteAuthorized);
