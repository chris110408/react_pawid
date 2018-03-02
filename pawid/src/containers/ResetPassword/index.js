import React from 'react';


import { connect } from 'react-redux';
import { compose } from 'redux';
import {ResetPasswordPage} from './ResetPassword'
import {withSaga} from './model/sagas'
import {usernameSelector} from './model/selectors'

const mapStateToProps = state => ({

    username: usernameSelector(state)
});

export default compose(withSaga, connect(mapStateToProps))(ResetPasswordPage);