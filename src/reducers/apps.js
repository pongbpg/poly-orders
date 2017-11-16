const appsReducerDefaultState = [];

export default (state = appsReducerDefaultState, action) => {
    switch (action.type) {
        // case 'ADD_APP':
        //     return [
        //         ...state,
        //         action.app
        //     ];
        case 'LIST_APPS':
            return action.apps;
        default:
            return state;
    }
};