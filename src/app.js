import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { checkLogin } from './actions/logins';
import { getUser, resetUser } from './actions/users';
import { startListApps } from './actions/apps';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { storage } from 'firebase';
import { setPath } from './actions/path';

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
        // console.log(store.getState().path);
        if (history.location.pathname === '/' && store.getState().path === '/') {
          history.push('/dashboard');
        } else {
          // store.dispatch(setPath(history.location.pathname));
          history.push(store.getState().path);
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