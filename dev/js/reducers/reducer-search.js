export default function (state = null, action) {
    switch (action.type) {
        case 'SEARCH_CHANGE':
            return action.payload || '';
            break;
    }
    return state;
}