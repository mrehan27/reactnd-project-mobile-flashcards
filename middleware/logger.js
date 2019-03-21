export default (store) => (next) => (action) => {
    switch (action.type) {
        case 'loading-bar/SHOW':
            console.log('Action received: SHOW LOADING');
            break;
        case 'loading-bar/HIDE':
            console.log('Action received: HIDE LOADING');
            break;

        default:
            console.group(action.type);
            console.log('Action received: ', action);
            const value = next(action);
            console.log('State updated to: ', store.getState());
            console.groupEnd();
            return value;
    }
    return next(action);
};
