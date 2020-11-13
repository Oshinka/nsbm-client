import { loginReducer, darkModeReducer } from './appBar';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    isLogged: loginReducer,
    isDark: darkModeReducer
});

export default rootReducers;
