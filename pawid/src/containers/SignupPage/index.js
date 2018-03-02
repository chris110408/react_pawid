import React from 'react';

import { Form, Input, Button, Popover, Progress } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { withReducer } from './model/reducers';
import { withSaga } from './model/sagas';

import { Signuppage } from './Signuppage';

const mapStateToProps = state => ({
  error: state.getIn(['signup', 'username', 'error']),
  status: state.getIn(['signup', 'username', 'status']),
    btn_loading: state.getIn(['signup', 'btn', 'loading'])
});

const withConnect = connect(mapStateToProps);

export default compose(withReducer, withSaga, withConnect)(Signuppage);
