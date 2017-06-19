import {combineReducers} from 'redux';
import UserReducer from './reducer-user';
import BarReducer from './reducer-bars';
import SearchReducer from './reducer-search';
import BarsListReducer from './reducer-barslist';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
		search: SearchReducer,
    user: UserReducer,
    bars: BarReducer,
    barsList: BarsListReducer
});

export default allReducers;