import database from '../firebase/firebase';

export const checkLogin = (user) => {
    const providerData = {
        ...user.providerData[0],
        email: user.emailVerified ? user.email : user.providerData[0].email
    };
    return (dispatch) => {
        return database.ref(`logins/${user.uid}`).once('value').then((snapshot) => {
            if (snapshot.hasChild('idcard')) {
                dispatch(setAuth(user.uid, {
                    ...snapshot.val(),
                    ...providerData
                }, { hasIDCard: true }))
            } else {
                dispatch(registerUID(user));
            }
        });
    }
};

export const registerUID = (user) => {
    const providerData = {
        ...user.providerData[0],
        email: user.emailVerified ? user.email : user.providerData[0].email
    };
    return (dispatch) => {
        return database.ref(`logins/${user.uid}`)
            .update(providerData)
            .then((ref) => {
                dispatch(setAuth(user.uid, providerData, { hasIDCard: false }))
            });
    };
};

export const setAuth = (uid, providerData, { hasIDCard }) => ({
    type: 'SET_AUTH',
    uid,
    providerData,
    hasIDCard
});