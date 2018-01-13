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
                return database.ref(`products/${productCode}`)
                    .update(JSON.parse(replaceAll(JSON.stringify(snapshot.metadata), "undefined", "null")))
            })
    };
};

export const listProducts = () => {
    return (dispatch) => {
        return database.ref('products').on('value', (snapshot) => {
            const products = [];
            snapshot.forEach((child) => {
                products.push({
                    id: child.key,
                    ...child.val()
                });
            });
            dispatch(setListProducts(products));
        })
    }
}

export const setListProducts = (products) => ({
    type: 'LIST_PRODUCTS',
    products
});