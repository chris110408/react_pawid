import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { branch, withProps } from 'recompose';


const RedirectRoute = () => () => <Redirect to="/login" />;

const myRoute = WrappedComponent => props => {
  return <Route component={withProps({ ...props })(WrappedComponent)} />;
};

export const UserRoute = branch(
  props => {
    console.log(props);
    return false;
  },
  RedirectRoute,
  myRoute
);
