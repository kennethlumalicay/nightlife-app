import axios from 'axios';

export function toggleGoing (user, bar, dispatch) {
}

export function searchBar(search, dispatch, lat=null, lon=null) {
  console.log("Searching for", search);
  dispatch({ type: 'BAR_SEARCH_FETCHING', payload: true })
	axios.get('/api/yelp', { params: { location: search, lat: lat, lon: lon }})
	.then(res => {
		var bList = res.data.businesses;
		if(!!bList) dispatch({ type:'BAR_SEARCH_RESULTS', payload: bList});
		else dispatch({ type:'BAR_SEARCH_FAILED', failed: true });
	})
	.catch(err => {
		console.log('Failed to fetch data from yelp api.', err);
		dispatch({ type:'BAR_SEARCH_FAILED', failed: true })
  });
};