
// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.less';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import  {configureStore,history}  from './config/configureStore';


const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

if (localStorage.authtoken){}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
);


if (module.hot) {
    module.hot.accept('./containers/App/App', () => {
        const NextApp = require('./containers/App/App').default;
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <NextApp />
                </ConnectedRouter>
            </Provider>,
            MOUNT_NODE
        );
    });
    window.store = store;
}
registerServiceWorker();


