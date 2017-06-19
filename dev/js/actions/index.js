import axios from 'axios';

export function toggleGoing (user, bar, action, dispatch) {
	axios.get('/api/bars', { params: { action: action, userId: user.id, username: user.username, barId: bar }})
	.then(res => {
		dispatch({ type:'BARSLIST_UPDATE', payload: res.data });
	})
	.catch(err => {
		dispatch({ type:'BARSLIST_FAILED' })
	});
}

export function searchBar(search, dispatch, lat=null, lon=null) {
  dispatch({ type: 'BAR_SEARCH_FETCHING', payload: true })
	axios.get('/api/yelp', { params: { location: search, lat: lat, lon: lon }})
	.then(res => {
		var bList = res.data.businesses;
		if(!!bList) dispatch({ type:'BAR_SEARCH_RESULTS', payload: bList});
		else dispatch({ type:'BAR_SEARCH_FAILED', failed: true });
	})
	.catch(err => {
		dispatch({ type:'BAR_SEARCH_FAILED', failed: true })
  });
};