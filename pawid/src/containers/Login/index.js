import React from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { makeSelectTest } from './model/selectors';
import { createStructuredSelector } from 'reselect';
import { initlogin } from './model/actions';

import styled from 'styled-components';

const Divform = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 360px;
  height: 360px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
  }
`;

const FormItem = Form.Item;
const NormalLoginForm = ({ dispatch, form: { getFieldDecorator, validateFieldsAndScroll }, user }) => {
  const handleSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      dispatch(initlogin(values));
    });
  };

  return (
    <Divform>
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
              }, {
                  required: true, message: 'Please input your E-mail!',
              }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username or email" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to="/forgetpassword" className="login-form-forgot" >
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or  <Link to="/signup">register now!</Link>


        </FormItem>
      </Form>
    </Divform>
  );
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state)=>({ user: state});

const withConnect = connect(mapStateToProps);

export default compose( withConnect)(WrappedNormalLoginForm);
