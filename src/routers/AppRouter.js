import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RegisterRoute from './RegisterRoute';

import LoginPage from '../components/LoginPage';
import CartsPage from '../components/carts/ListPage';
import NotFoundPage from '../components/NotFoundPage';
import AddressPage from '../components/AddressPage';


import ProductsListPage from '../components/products/ListPage';
import ProductsAddPage from '../components/products/AddPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/address" component={AddressPage} />
        <RegisterRoute path="/carts" component={CartsPage} />
        <RegisterRoute path="/products/add" component={ProductsAddPage} />
        <RegisterRoute path="/products" component={ProductsListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
