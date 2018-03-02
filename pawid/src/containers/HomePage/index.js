/**
 * Created by leichen on 12/02/2018.
 */
import React from 'react';
import logo from '../../logo.svg';
import { Button } from 'antd';
import { DivApp, HeaderAPP, ImgLogo, TitleH1, IntroP } from './style/app';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { typelector } from './model/selectors';
import { createStructuredSelector } from 'reselect';
import {initLogout} from '../Login/model/actions'
import {USER_TYPE_GUEST} from '../../CONSTANTS'


const HomePage = ({ dispatch, userType }) => {


  return (
    <DivApp>

      <HeaderAPP>
        <ImgLogo src={logo} alt="logo" />
        <TitleH1>Welcome to React</TitleH1>
      </HeaderAPP>
      <IntroP>
        To get started, edit <code>src/App.js</code> and save to reload.
      </IntroP>
        {userType===USER_TYPE_GUEST ? (
            <Button>
                <Link to="/login">login</Link>
            </Button>
        ) : (
            <Button onClick={() => dispatch(initLogout())}>logout</Button>
        )}
    </DivApp>
  );
};

const mapStateToProps =(state) => ({ userType: state.getIn(['user','userinfo','usertype'])});

// noinspection JSAnnotator
export default connect(mapStateToProps)(HomePage);
