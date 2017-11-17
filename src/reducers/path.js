export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATH':
            return action.path;
        case 'REMOVE_PATH':
            return {};
        default:
            return state;
    }
};