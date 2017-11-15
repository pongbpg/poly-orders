import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

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

export const login = (uid, providerData) => ({
    type: 'LOGIN',
    uid,
    providerData
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};