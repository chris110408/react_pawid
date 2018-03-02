import React from 'react';
import { MessageElement } from './components/MessageElement';
import { Link } from 'react-router-dom';
import {lifecycle} from 'recompose'
import {UNMOUNT_PAGE} from './model/actions'

const MessagePage = ({ dispatch, title, status, description }) => {
  return (
    <div>
      <Link to="/">HomePage</Link>
      <MessageElement />
    </div>
  );
};


export default lifecycle({
    componentWillUnmount(){
       this.props.dispatch({type:UNMOUNT_PAGE})
    }
})(MessagePage)




