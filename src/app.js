import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { checkLogin } from './actions/logins';
import { getUser, resetUser } from './actions/users';
import { listUsers } from './actions/users';
import { login, logout } from './actions/auth';
import { startListApps } from './actions/apps';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
import 'bulma/css/bulma.css'
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { storage } from 'firebase';
import { setPath } from './actions/sys';
import jwt from 'jsonwebtoken';

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
  // console.log('authState', user)
  if (user) {
    // console.log(user);
    store.dispatch(login(user.uid, user.providerData[0]));
    store.dispatch(checkLogin(user)).then(() => {
      if (!store.getState().auth.hasIDCard) {
        renderApp();
        history.push('/idcard');
      } else {
        renderApp();
        store.dispatch(getUser(store.getState().auth.providerData.idcard))
        store.dispatch(startListApps(store.getState().user.apps));
        store.dispatch(listUsers());
        if (history.location.pathname === '/' && store.getState().sys.path === '/') {
          history.push('/dashboard');
        } else {
          const path = store.getState().sys.path;
          if (typeof path === 'string') {
            if (path.indexOf('callback') > -1) {
              const callbackUrl = path.split('/')[2];
              const appId = path.split('/')[3];
              const token = jwt.sign({ appId, callbackUrl, idcard: store.getState().auth.idcard }, 'auth@kmutnb');
              window.location = `https://${callbackUrl}?token=${token}`
            }
          }
          history.push(store.getState().sys.path);
        }
      }
    });
  } else {
    store.dispatch(logout());
    store.dispatch(resetUser());
    store.dispatch(setPath(history.location.pathname));
    renderApp();
    history.push('/');
  }
});