import { loginReducer, darkModeReducer, drawerReducer, avatarReducer } from './appBar';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    isLogged: loginReducer,
    isDark: darkModeReducer,
    isOpenDrawer: drawerReducer,
    avatar: avatarReducer
});

export default rootReducers;
