import React from 'react';
import { Spin, Form, Input, Button, Popover, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { Divform, SuccessDiv, WarningDiv, ErrorDiv } from './style';
import { initVerifyToken,resetPassword } from './model/actions';
import { lifecycle } from 'recompose';

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception'
};

const passwordStatusMap = {
  ok: <SuccessDiv>security：good</SuccessDiv>,
  pass: <WarningDiv>security：ok</WarningDiv>,
  poor: <ErrorDiv>security：too short</ErrorDiv>
};

const FormItem = Form.Item;
const ResetPasswordForm = ({ dispatch, form, error, status, match, username }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const userinfo = { username, password: values.password };
        dispatch(resetPassword(userinfo));
      }
    });
  };

  const renderPasswordProgress = form => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus(form);
    return value && value.length ? (
      <div>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const getPasswordStatus = form => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const checkConfirm = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('password do not match!');
    } else {
      callback();
    }
  };

  const checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('Please input your password');
    } else {
      if (value.length < 6) {
        callback('Please at leaset input 6 characters');
      } else {
        callback();
      }
    }
  };
  const usernameElement = username => {
    if (username == 'na') {
      return <Spin />;
    }
    return username ? username : 'Guest';
  };
  return (
    <Divform>
      <h4>Reset Password for </h4>
      <h4>{usernameElement(username)}</h4>
      <Form onSubmit={handleSubmit}>
        <FormItem hasFeedback>
          <Popover
            content={
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus(form)]}
                {renderPasswordProgress(form)}
                <div style={{ marginTop: 10 }}>Please at leaset input 6 characters</div>
              </div>
            }
            overlayStyle={{ width: 240 }}
            placement="right"
          >
            {form.getFieldDecorator('password', {
              rules: [{ validator: checkPassword }]
            })(<Input size="large" type="password" placeholder="Password" />)}
          </Popover>
        </FormItem>

        <FormItem hasFeedback>
          {form.getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'please confirm your password'
              },
              {
                validator: checkConfirm
              }
            ]
          })(<Input size="large" type="password" placeholder="password confirm" />)}
        </FormItem>

        <Button size="large" type="primary" htmlType="submit">
          Reset Password
        </Button>
        <Link className="homepage" to="/">
          Back to Home
        </Link>
      </Form>
    </Divform>
  );
};

const ResetPasswordElement = Form.create()(ResetPasswordForm);
export const ResetPasswordPage = lifecycle({
  componentWillMount() {
    const { match, dispatch } = this.props;
    dispatch(initVerifyToken(match.params.token));
  }
})(ResetPasswordElement);
