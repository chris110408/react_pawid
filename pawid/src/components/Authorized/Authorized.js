import React from 'react';
import {checkPermissions} from './CheckPermissions';

class Authorized extends React.Component {
    render() {
        const { children, authority, noMatch = null,currentAuth = null } = this.props;
        const childrenRender = typeof children === 'undefined' ? null : children;
        return checkPermissions(authority, childrenRender, noMatch)(currentAuth);
    }
}

export default Authorized;