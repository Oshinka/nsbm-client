import { loginReducer, darkModeReducer, drawerReducer } from './appBar';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    isLogged: loginReducer,
    isDark: darkModeReducer,
    isOpenDrawer: drawerReducer
});

export default rootReducers;
