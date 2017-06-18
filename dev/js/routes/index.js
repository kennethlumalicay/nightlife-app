var path = process.cwd();
var yelp = require('./../api/yelpApi.js');

module.exports = function (app, passport) {
	app.route('/login')
		.get(function (req, res) {
			req.session.search = req.query.search;
			req.session.saveSearch = true;
			res.redirect('/auth/twitter');
		});

	app.route('/signout')
		.get(function (req, res) {
			req.session.search = req.query.search;
			req.session.saveSearch = true;
			req.logout();
			res.redirect('/');
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/api/yelp')
		.get(function (req, res) {
			yelp(req.query, res);
		});
};
