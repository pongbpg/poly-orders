import database from '../firebase/firebase';

export const checkLogin = (user) => {
    return (dispatch) => {
        return database.ref(`logins/${user.uid}`).once('value').then((snapshot) => {
            if (snapshot.hasChild('idcard')) {
                dispatch(setAuth(user.uid,{
                    ...snapshot.val(),
                    ...user.providerData[0]
                }, { hasIDCard: true }))
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
                dispatch(setAuth(user.uid,user.providerData[0], { hasIDCard: false }))
            });
    };
};

export const setAuth = (uid,providerData, { hasIDCard }) => ({
    type: 'SET_AUTH',
    uid,
    providerData,
    hasIDCard
});