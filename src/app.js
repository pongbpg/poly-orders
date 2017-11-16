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
    store.dispatch(login(user.uid, user.providerData[0]));
    store.dispatch(checkLogin(user)).then(() => {
      if (!store.getState().auth.hasIDCard) {
        renderApp();
        history.push('/idcard');
      } else {
        renderApp();
        store.dispatch(getUser(store.getState().auth.providerData.idcard))
        // .then(() => {
        store.dispatch(startListApps(store.getState().user.apps));
        if (history.location.pathname === '/') {
          history.push('/dashboard');
        }
        // });

      }
    });
  } else {
    store.dispatch(logout());
    store.dispatch(resetUser());
    renderApp();
    history.push('/');
  }
});