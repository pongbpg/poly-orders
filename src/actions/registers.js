import database from '../firebase/firebase';

export const checkRegister = (user) => {
    return (dispatch) => {
        return database.ref(`registers/${user.uid}`).once('value').then((snapshot) => {
            // console.log(snapshot.val().hasOwnProperty('idcard'));
            // const providerData = snapshot.val();
            if (snapshot.hasChild('idcard')) {
                // console.log(snapshot.val());
                dispatch(setAuth(snapshot.val(), { hasIDCard: true }))
            } else {
                dispatch(registerUID(user));
            }
        });
    }
};

export const registerUID = (user) => {
    return (dispatch) => {
        return database.ref(`registers/${user.uid}`)
            .update(user.providerData[0])
            .then((ref) => {
                dispatch(setAuth(user.providerData[0], { hasIDCard: false }))
            });
    };
};

export const setAuth = (providerData, { hasIDCard }) => ({
    type: 'setAuth',
    providerData,
    hasIDCard
});