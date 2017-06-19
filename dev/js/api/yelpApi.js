import axios from 'axios';

module.exports = function(query, response) {
	var yelp = {
		id: process.env.API_ID,
		secret: process.env.API_SECRET,
		url: process.env.API_URL,
		tokenUrl: process.env.API_TOKEN_URL
	};
	if(query) {
		axios({
			method: 'post',
			url: yelp.tokenUrl,
			data: 'grant_type=client_credentials'
						+ '&client_id='+yelp.id
						+ '&client_secret='+yelp.secret
		}).then(res => {
		  const USER_TOKEN = res.data.access_token;
			const AuthStr = 'Bearer '.concat(USER_TOKEN);
			axios.get(yelp.url, {
				headers: { Authorization: AuthStr },
				params: {
					location: query.location,
					//latitude: query.lat,
					//longitude: query.lon,
					categories: 'nightlife',
					limit: 50
				}
			})
			.then(res => {
				response.send(res.data);
			  })
			.catch((error) => {
		  	console.log('error ' + error);
		  	response.send(null);
			});
		})
		.catch((error) => {
		  console.log('error ' + error);
		  response.send(null);
		});
	}
}