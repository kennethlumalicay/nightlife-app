export default function (state = null, action) {
    switch (action.type) {
        		console.log('SEARCH_CHANGE');
            return action.payload || '';
            break;
    }
    return state;
}