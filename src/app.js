import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { checkLogin, logout } from './actions/auth';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
import 'bulma/css/bulma.css'
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { listProducts } from './actions/product';
import { firebase } from './firebase/firebase';
// import { storage } from 'firebase';
// import { setPath } from './actions/sys';
// import jwt from 'jsonwebtoken';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  renderApp();
  if (user) {
    store.dispatch(checkLogin(user));
    store.dispatch(listProducts());
  } else {
    store.dispatch(logout());
    history.push('/');
    // history.push('/');
  }

});