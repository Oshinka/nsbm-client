import loginReducer from './login';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    isLogged: loginReducer
});

export default rootReducers;
