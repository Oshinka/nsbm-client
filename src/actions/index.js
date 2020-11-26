export const login = () => {
    return {
        type: 'SIGN_IN'
    };
};

export const logout = () => {
    return {
        type: 'SIGN_OUT'
    };
};

export const switchBrightness = () => {
    return {
        type: 'IS_DARK'
    };
};

export const openDrawer = () => {
    return {
        type: 'OPEN_DRAWER'
    };
};

export const closeDrawer = () => {
    return {
        type: 'CLOSE_DRAWER'
    };
};

export const setReduxAvatar = () => {
    return {
        type: 'SET_AVATAR'
    };
};