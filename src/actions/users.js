import database from '../firebase/firebase';
import { setAuth } from './registers';

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
                return database.ref(`registers/${registerId}/idcard`)
                    .set(idcard)
                    .then(() => {
                        console.log('register idcard updated!');
                        dispatch(setAuth({ idcard }, { hasIDCard: true }));
                    });
            });
    }
};

export const updateIdCard = (uid, idcard) => {
    return (dispatch) => {

    }
};