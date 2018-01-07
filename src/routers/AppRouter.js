import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import IDCardPage from '../components/IDCardPage';
import ListAppPage from '../components/apps/ListPage';
import AddAppPage from '../components/apps/AddPage';
import EditAppPage from '../components/apps/EditPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UsersPage from '../components/users/UsersPage';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/callback" component={DashboardPage} />
        <PrivateRoute path="/idcard" component={IDCardPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/apps/add" component={AddAppPage} />
        <PrivateRoute path="/apps/edit/:id" component={EditAppPage} />
        <PrivateRoute path="/apps" component={ListAppPage} />
        <PrivateRoute path="/users" component={UsersPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
