import React from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { initVerify } from './model/actions';

import styled from 'styled-components';

const Divform = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 360px;
  height: 200px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
  }
`;

const FormItem = Form.Item;
const ForgetPasswordPage = ({ dispatch, form: { getFieldDecorator, validateFieldsAndScroll }, user }) => {
  const handleSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(initVerify(values));
      }
    });
  };

  return (
    <Divform>
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
              rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
              }, {
                  required: true, message: 'Please input your E-mail!',
              }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username or email" />
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Send Reset Password Email
          </Button>
          Or <Link to="/">back to home page</Link>
        </FormItem>
      </Form>
    </Divform>
  );
};

export const WrappedNormalLoginForm = Form.create()(ForgetPasswordPage);
