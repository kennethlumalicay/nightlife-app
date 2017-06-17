'use strict';

module.exports = {
	'twitterAuth': {
		'clientID': process.env.CONSUMER_KEY,
		'clientSecret': process.env.CONSUMER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	}
};
