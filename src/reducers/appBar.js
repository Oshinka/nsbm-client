export const loginReducer = (state = false, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return true;
        case 'SIGN_OUT':
            return false;
        default:
            return state;
    }
}

export const darkModeReducer = (state = false, action) => {
    switch (action.type) {
        case 'IS_DARK':
            return !state;
        default:
            return state;
    }
}
