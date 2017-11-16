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
        case 'SET_AUTH':
            return {
                ...state,
                providerData: {
                    ...state.providerData,
                    ...action.providerData
                },
                hasIDCard: action.hasIDCard || state.hasIDCard,
                idcard: action.providerData.idcard
            };
        default:
            return state;
    }
};