export default function (state = null, action) {
    switch (action.type) {
        case 'BARSLIST_UPDATE':
        		console.log('BARSLIST_UPDATE');
            return action.payload || null;
            break;
        case 'BARSLIST_FAILED':
        		console.log('BARSLIST_FAILED');
        		return state;
        		break;
    }
    return state;
}