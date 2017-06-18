export default function (state = null, action) {
    switch (action.type) {
        case 'SEARCH_CHANGE':
        		console.log('SEARCH_CHANGE');
            return action.payload || '';
            break;
    }
    return state;
}