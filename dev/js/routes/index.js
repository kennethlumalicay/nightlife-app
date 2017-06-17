var path = process.cwd();
var yelp = require('./../api/yelpApi.js');

module.exports = function (app, passport) {
	var logged = false;

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			console.log("User is logged in.");
			logged = true;
			return next();
		} else {
			console.log("User is signed out.");
			logged = false;
			if(req.url == '/') return next();
			else res.redirect('/');
		}
	}

	app.route('/login')
		.get(function (req, res) {
			res.redirect('/auth/twitter/callback');
		});

	app.route('/signout')
		.get(function (req, res) {
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
