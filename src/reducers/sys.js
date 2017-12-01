export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATH':
            return {
                ...state,
                path: action.path
            };
        case 'REMOVE_PATH':
            return {
                ...state,
                path: '/'
            };
        case 'SET_TITLE':
            return {
                ...state,
                title: action.title
            }
        default:
            return state;
    }
};