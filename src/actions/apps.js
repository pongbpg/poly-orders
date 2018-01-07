import database from '../firebase/firebase';
import selectApps from '../selectors/myapps';

export const addApp = (app) => ({
    type: 'ADD_APP',
    app
});

export const startAddApp = (appData = {}) => {
    return (dispatch) => {
        const {
            appName = '',
            domainName = '',
            callbackUrl = '',
            callbackProtocol = 'http',
            adminApprove = false,
            isActive = true,
            secretKey = 'auth@kmutnb'
            } = appData;
        const app = { appName, domainName, callbackUrl, callbackProtocol, adminApprove, isActive, secretKey };
        return database.ref(`apps`).push(app)
    };
};
export const startEditApp = (id, updates) => {
    return (dispatch) => {
        return database.ref(`apps/${id}`).update(updates)
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
            console.log('change apps datas...');
            snapshot.forEach((childSnapshot) => {
                apps.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // dispatch(startSelectApps(apps, userApps));
            dispatch(listApps(apps));
        });
    }
};

export const startSelectApps = (apps, userApps) => {
    return (dispatch) => {
        // dispatch(listApps(selectApps(apps, userApps)));
        dispatch(listApps(apps));
    }
};