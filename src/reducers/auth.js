export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                providerData: action.providerData,
                hasIDCard: false
            };
        case 'LOGOUT':
            return {};
        case 'setAuth':
            return {
                ...state,
                providerData: {
                    ...state.providerData,
                    ...action.providerData
                },
                hasIDCard: action.hasIDCard || state.hasIDCard
            };
        default:
            return state;
    }
};