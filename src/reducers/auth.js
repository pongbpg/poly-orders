export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                providerData: action.providerData,
                hasIDCard: false,
                idcard:undefined
            };
        case 'LOGOUT':
            return {};
        case 'SET_AUTH':
            return {
                ...state,
                uid:action.uid,
                providerData: {
                    ...state.providerData,
                    ...action.providerData
                },
                hasIDCard: action.hasIDCard || false,
                idcard: action.providerData.idcard||undefined
            };
        default:
            return state;
    }
};