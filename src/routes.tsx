import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import './config/axios';
import 'semantic-ui-css/semantic.min.css'
import { store } from './config/store';
import { history } from './config/history';

import Root from './views/root/RootContainer';

export default () => (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/home" component={Root} />
                <Redirect to="/home" />
            </Switch>
        </Router>
    </Provider>
);
