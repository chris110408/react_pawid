import React from 'react';
import {withSaga} from './model/sagas'

import { connect } from 'react-redux';
import { compose } from 'redux';
import {WrappedNormalLoginForm as ForgetPasswordPage} from './ForgetPassword'




export default compose( withSaga,connect())(ForgetPasswordPage);