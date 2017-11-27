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
        return database.ref(`users/${idcard}/logins/${loginId}`)
            .set(data)
            .then(() => {
                return database.ref(`logins/${loginId}/idcard`)
                    .set(idcard)
                    .then(() => {
                        dispatch(setAuth(loginId, { idcard }, { hasIDCard: true }));
                        dispatch(getUser(idcard));
                    });
            });
    }
};

export const getUser = (idcard) => {
    return (dispatch) => {
        return database.ref(`users/${idcard}`).on('value', (snapshot) => {
            const user = { apps: [], logins: [], role: 'user' };
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                if (key === 'role') {
                    user.role = childSnapshot.val();
                } else {
                    childSnapshot.forEach((data) => {
                        user[key].push({ ...data.val() });
                    });
                }
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

export const setUsers = (users) => ({
    type: 'SET_USERS',
    users
});

export const updateRole = (idcard, role) => {
    return (dispatch) => {
        return database.ref(`users/${idcard}`).update({
            role
        })
            .then(() => {
                dispatch(listUsers());
            })
    }
};

export const listUsers = () => {
    return (dispatch) => {
        return database.ref(`users`).on('value', (snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                const idcard = childSnapshot.key;
                users.push({
                    idcard,
                    role: childSnapshot.val().role || 'user'
                })
            });
            dispatch(setUsers(users));
        });
    }
}