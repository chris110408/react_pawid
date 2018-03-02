import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import MessagePage from './MessagePage';
import { compose } from 'recompose';
import { selectStatus, selectTitle, selectDescription } from './model/selectors';
import { withSaga } from './model/sagas';

const mapStateToProps = state => ({
  title: selectTitle(state),
  status: selectStatus(state),
  description: selectDescription(state)
});

const withConnect = connect(mapStateToProps)

export default compose(withSaga,withConnect)(MessagePage);
