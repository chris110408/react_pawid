import React from 'react';

import {connect} from 'react-redux';
import {ConfrimEmailMessage }from './components/ConfirmEmailMessage'
import { Link } from 'react-router-dom';


const DashboardPage =() => {

    return <div>
        <Link to="/">HomePage</Link>
        <ConfrimEmailMessage/>
    </div>
}


export default  connect()(DashboardPage);


