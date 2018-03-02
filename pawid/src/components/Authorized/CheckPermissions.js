
import { getTypeOf } from '../type/getType';
// import { Redirect } from 'react-router-dom';
import {ifElse,prop}from 'ramda';
// import withProps from 'recompose/withProps';

// const RedirectToHomePage = withProps({ to: '/' })(Redirect);

const renderchildrenRender = (authority, childrenRender, noMatch, currentAuthority) => childrenRender;
const renderNoMatch = (authority, childrenRender, noMatch, currentAuthority) => noMatch;

const renderArrayAuth = (authority, childrenRender, noMatch, currentAuthority) =>
  authority.indexOf(currentAuthority) >= 0 ? childrenRender : noMatch;

const renderBooleanAuth = (authority, childrenRender, noMatch, currentAuthority) =>
  authority ? childrenRender : noMatch;

const renderStringAuth = (authority, childrenRender, noMatch, currentAuthority) =>
  authority === currentAuthority ? childrenRender : noMatch;

const renderFunctionAuth = (authority, childrenRender, noMatch, currentAuthority) => {
  try {
    const isAuth = authority(currentAuthority);
    return isAuth ? childrenRender : noMatch;
  } catch (error) {
    throw error;
  }
};


const CheckAuthFunctions = {
  Empty: renderchildrenRender,
  Null: renderchildrenRender,
  Array: renderArrayAuth,
  Boolean: renderBooleanAuth,
  String: renderStringAuth,
  Function: renderFunctionAuth,
  Rest: renderNoMatch
};



export const createCurrentAuth = authority => {
  const isFunction = authority => getTypeOf(authority) === 'Function';

  const getStringAuth = authority => (getTypeOf(authority) === 'String' ? authority : 'NULL');

  return ifElse(isFunction, authority => authority(), getStringAuth)(authority);
};

export const checkPermissions = (authority, childrenRender, noMatch)=> (currentAuthority = null) => {
  const _TypeOfAuth = getTypeOf(authority);
  const current = createCurrentAuth(currentAuthority);
  const check = ifElse(prop(_TypeOfAuth), prop(_TypeOfAuth), prop('Rest'))(CheckAuthFunctions);
  return check(authority, childrenRender, noMatch, current);
};
