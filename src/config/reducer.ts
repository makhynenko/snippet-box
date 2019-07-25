import { combineReducers } from 'redux';
import global from '../views/duck';
import root from '../views/root/duck';

export const rootReducer = combineReducers({
    root,
    global,
});
