export default function (state = null, action) {
    switch (action.type) {
        case 'BAR_SEARCH':
            return Object.assign({}, state, {businesses: action.payload});
            break;
    }
    return state;
}