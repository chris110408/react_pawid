import React from 'react';

import {connect} from 'react-redux';
import {ConfrimEmailMessage }from './components/ConfirmEmailMessage'
import { Link } from 'react-router-dom';


const DashboardPage =(props) => {

    return <div>
        <Link to="/">HomePage</Link>
        <div>DashBoard</div>
    </div>
}

const  mapStateToProps= (state)=>{
    return {
        isConfrimed:false
    }
}

export default  connect(mapStateToProps)(DashboardPage);