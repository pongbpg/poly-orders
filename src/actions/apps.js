import database from '../firebase/firebase';
import selectApps from '../selectors/apps';

export const addApp = (app) => ({
    type: 'ADD_APP',
    app
});

export const startAddApp = (appData = {}) => {
    return (dispatch) => {
        const {
            appName = '',
            domainName = '',
            callbackUrl = ''
            } = appData;
        const app = { appName, domainName, callbackUrl };
        return database.ref(`apps`).push(app)
    };
};

export const listApps = (apps) => ({
    type: 'LIST_APPS',
    apps
});

export const startListApps = (userApps) => {
    return (dispatch) => {
        database.ref(`apps`).on('value', (snapshot) => {
            const apps = [];
            snapshot.forEach((childSnapshot) => {
                apps.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(startSelectApps(apps, userApps));
        });
    }
};

export const startSelectApps = (apps, userApps) => {
    return (dispatch) => {
        dispatch(listApps(selectApps(apps, userApps)));
    }
};