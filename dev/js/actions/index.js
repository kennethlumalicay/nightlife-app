import axios from 'axios';

export function searchBar(search, dispatch, lat=null, lon=null) {
  console.log("Searching for", search);
	axios.get('/api/yelp', { params: { location: search, lat: lat, lon: lon }})
	.then(res => {
		var bList = res.data.businesses;
		dispatch({ type:'BAR_SEARCH', payload:bList});
	})
	.catch(err => {
		console.log('Failed to fetch data from yelp api.');
  	});
};