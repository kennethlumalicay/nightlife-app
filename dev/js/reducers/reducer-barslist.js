export default function (state = null, action) {
    switch (action.type) {
        case 'BARSLIST_UPDATE':
            return action.payload || null;
            break;
        case 'BARSLIST_FAILED':
        		return state;
        		break;
    }
    return state;
}