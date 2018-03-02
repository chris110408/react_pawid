import React from 'react';
import { Form, Input, Button, Popover, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { Divform, SuccessDiv, WarningDiv, ErrorDiv } from './style';
import { initSignup ,setSignupError,setBtnLoading} from './model/actions';
import { validate } from 'email-validator';


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
const SignupForm = ({ dispatch, form, error,status,btn_loading }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        dispatch(setBtnLoading(true))
        dispatch(initSignup(values));
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



    const checkEmail = (rule, value, callback) => {
        if (!value) {
            dispatch(setSignupError({error:'Please input your email',status:'error'}))
            callback('error');
        } else {
            dispatch(setSignupError({error:'',status:'success'}))
            if ( !validate(value)) {
                dispatch(setSignupError({error:'Please input a valid email',status:'error'}))
                callback('error');
            } else {
                dispatch(setSignupError({error:'',status:'success'}))
                callback();
            }
        }
    };



  return (
    <Divform>
      <h3>Sign Up</h3>
      <Form onSubmit={handleSubmit}>
        <FormItem hasFeedback help={error} validateStatus={status}>
          {form.getFieldDecorator('username', {
            rules: [
                {
                    validator: checkEmail
                }
            ]
          })(<Input size="large" placeholder="email" />)}
        </FormItem>

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

        <Button size="large" type="primary" htmlType="submit" loading={btn_loading}>
          Sign Up
        </Button>
        <Link className="login" to="/login">
          Want to Login
        </Link>
      </Form>
    </Divform>
  );
};

export const Signuppage = Form.create()(SignupForm);
