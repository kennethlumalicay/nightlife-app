export default function (state = null, action) {
    switch (action.type) {
        case 'BAR_SEARCH_RESULTS':
            return Object.assign({}, state, {
            	businesses: action.payload || null,
            	isFetching: false,
            	isFetchFail: action.failed || false
            });
            break;
        case 'BAR_SEARCH_FETCHING':
        		return Object.assign({}, state, {isFetching: action.payload});
        		break;
        case 'BAR_SEARCH_FAILED':
        		return Object.assign({}, state, {
        			businesses: null,
        			isFetching: false,
        			isFetchFail: action.failed
        		});
        		break;
        case 'BAR_CLEAR':
      			return Object.assign({}, state, {
                    businesses: null,
                    isFetching: false,
                    isFetchFail: false
                });
    }
    return state;
}