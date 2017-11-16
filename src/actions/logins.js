import database from '../firebase/firebase';

export const checkLogin = (user) => {
    return (dispatch) => {
        return database.ref(`logins/${user.uid}`).once('value').then((snapshot) => {
            if (snapshot.hasChild('idcard')) {
                dispatch(setAuth(snapshot.val(), { hasIDCard: true }))
            } else {
                dispatch(registerUID(user));
            }
        });
    }
};

export const registerUID = (user) => {
    return (dispatch) => {
        return database.ref(`logins/${user.uid}`)
            .update(user.providerData[0])
            .then((ref) => {
                dispatch(setAuth(user.providerData[0], { hasIDCard: false }))
            });
    };
};

export const setAuth = (providerData, { hasIDCard }) => ({
    type: 'SET_AUTH',
    providerData,
    hasIDCard
});