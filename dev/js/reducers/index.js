import {combineReducers} from 'redux';
import UserReducer from './reducer-user';
import BarReducer from './reducer-bars';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    user: UserReducer,
    bars: BarReducer
});

export default allReducers;