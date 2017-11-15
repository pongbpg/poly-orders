import database from '../firebase/firebase';

export const addUser = (registerId, idcard, providerData) => {
    const provider = providerData.providerId.split('.')[0];
    const data = {
        registerId: registerId,
        idcard: idcard,
        ...providerData
    };
    return (dispatch) => {
        return database.ref(`users/${idcard}/${provider}`)
            .update(data)
            .then(() => {
                console.log('users saved!');
            });
    }
};

export const updateIdCardDB = (uid, idcard) => {
    return (dispatch) => {
        return database.ref(`registers/${uid}/idcard`)
            .set(idcard)
            .then(() => {
                console.log('register idcard updated!');
                dispatch(updateIdCard({ idcard }));
            });
    }
};

export const updateIdCard = (idcard) => ({
    type: 'UPDATE_IDCARD',
    idcard
});
