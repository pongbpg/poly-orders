import database, { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';


export const startLoginWithGoogle = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLoginWithFacebook = () => {
    return () => {
        return firebase.auth().signInWithPopup(facebookAuthProvider);
    };
};

export const login = (uid, providerData, { hasAddress }) => ({
    type: 'LOGIN',
    uid,
    providerData,
    hasAddress
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};


export const checkLogin = (user) => {
    const providerData = {
        ...user.providerData[0],
        email: user.emailVerified ? user.email : user.providerData[0].email
    };
    return (dispatch) => {
        return database.ref(`members/${user.uid}`).once('value')
            .then((snapshot) => {
                if (snapshot.hasChild('address')) {
                    dispatch(login(user.uid, {
                        ...snapshot.val(),
                        ...providerData
                    }, { hasAddress: true }));
                    history.push('/products');
                } else {
                    dispatch(updateMember(user.uid, providerData))
                        .then((ref) => {
                            return dispatch(login(user.uid, providerData, { hasAddress: false }));
                        })
                        .then(() => {
                            history.push('/address');
                        });
                }
            });
    }
};

export const updateMember = (uid, providerData) => {
    return (dispatch) => {
        return database.ref(`members/${uid}`).update(providerData)
    };
};


