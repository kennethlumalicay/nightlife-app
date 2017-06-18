import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import allReducers from './reducers';

const storeHolder = {
	store: null,
	initialize: function(initialState) {
		return this.store = createStore(
			allReducers,
			initialState,
			applyMiddleware(thunk, promise(), createLogger())
		)
	}
}

export default storeHolder;