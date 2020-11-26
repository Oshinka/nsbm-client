import axios from '../axios';

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

export const drawerReducer = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return true;
        case 'CLOSE_DRAWER':
            return false;
        default:
            return state;
    }
}

export const avatarReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_AVATAR':
            axios.get('/students/me', { headers: { 'Authorization': localStorage.jwtToken } })
                .then(response => {
                    return response.data.avatar;
                })
                .catch(function (error) {
                    console.log(error);
                })
            break;
        default:
            return state;
    }
}
