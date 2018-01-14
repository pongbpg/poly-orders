import database, { storage, firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const addProduct = (productData = {}) => {
    return (dispatch) => {
        const {
            productCode = '',
            productImage = {}
        } = productData;
        const product = { productCode, productImage };
        const name = productImage.name.split('.');
        const typefile = name[name.length - 1];
        const replaceAll = (s = "", f = "", r = "") => s.replace(new RegExp(f.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), r);
        return storage.ref(`products`).child(`${productCode}.${typefile}`).put(productImage)
            .then((snapshot) => {
                const data = {
                    ...snapshot.metadata,
                    like: 0
                };
                return database.ref(`products/${productCode}`)
                    .update(JSON.parse(replaceAll(JSON.stringify(data), "undefined", "null")))
            })
    };
};

export const listProducts = () => {
    return (dispatch) => {
        return database.ref('products').orderByChild('like').limitToLast(100).on('value', (snapshot) => {
            const products = [];
            snapshot.forEach((child) => {
                products.push({
                    id: child.key,
                    ...child.val()
                });
            });
            dispatch(setListProducts(products.sort((a, b) => {
                return a.like < b.like ? 1 : -1;
            })));
        })
    }
}

export const setListProducts = (products) => ({
    type: 'LIST_PRODUCTS',
    products
});

export const addLike = (uid, pid) => {
    return (dispatch) => {
        return database.ref(`products/${pid}/like`).once('value')
            .then((snapshot) => {
                const like = snapshot.val() + 1;
                return database.ref(`products/${pid}/like`).set(like)
                    .then(() => {
                        return database.ref(`members/${uid}/like/${pid}`).set(true);
                    })
            })
    }
}
export const disLike = (uid, pid) => {
    return (dispatch) => {
        return database.ref(`products/${pid}/like`).once('value')
            .then((snapshot) => {
                const like = snapshot.val() - 1;
                return database.ref(`products/${pid}/like`).set(like)
                    .then(() => {
                        return database.ref(`members/${uid}/like/${pid}`).remove()
                    })
            })
    }
}