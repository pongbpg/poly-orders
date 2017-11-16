import database from '../firebase/firebase';
import { setAuth } from './logins';
import { startListApps } from './apps';

export const addUser = (loginId, idcard, providerData) => {
    const provider = providerData.providerId.split('.')[0];
    const data = {
        loginId: loginId,
        idcard: idcard,
        ...providerData
    };
    return (dispatch) => {
        return database.ref(`users/${idcard}/providers`)
            .push(data)
            .then(() => {
                return database.ref(`logins/${loginId}/idcard`)
                    .set(idcard)
                    .then(() => {
                        dispatch(setAuth({ idcard }, { hasIDCard: true }));
                        dispatch(getUser(idcard));
                    });
            });
    }
};

export const getUser = (idcard) => {
    return (dispatch) => {
        return database.ref(`users/${idcard}`).on('value', (snapshot) => {
            const user = { apps: [], providers: [] };
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                childSnapshot.forEach((data) => {
                    user[key].push({ ...data.val() });
                });
            });
            dispatch(setUser(user));
            dispatch(startListApps(user.apps));
        });
    }
};

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const resetUser = () => ({
    type: 'RESET_USER'
});

export const addUserApp = (idcard, app) => {
    return (dispatch) => {
        return database.ref(`users/${idcard}/apps/${app.appId}`).set(app)
    }
};

export const removeUserApp = (idcard, appId) => {
    return (dispatch) => {
        return database.ref(`users/${idcard}/apps/${appId}`).remove()
    }
};