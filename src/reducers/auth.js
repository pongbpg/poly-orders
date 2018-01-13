export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                providerData: {
                    ...state.providerData,
                    ...action.providerData
                },
                carts: [],
                hasAddress: action.hasAddress
            };
        case 'LOGOUT':
            return {};
        // case 'SET_AUTH':
        //     return {
        //         ...state,
        //         uid: action.uid,
        //         providerData: {
        //             ...state.providerData,
        //             ...action.providerData
        //         },
        //         hasAddress: action.hasAddress
        //     };
        default:
            return state;
    }
};