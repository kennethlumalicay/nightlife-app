import axios from 'axios';
var BarsList = require('./../models/bars.js');

module.exports = function(query, response) {
	BarsList.find({ 'bar.id': query.barId }, function(err, data) {
		if(err) console.log(err);
		if(!data.length && query.action == 'add') {
			data = new BarsList({
				bar: {
					id: query.barId,
					going: [{
						userID: query.userId,
						username: query.username
					}]
				}
			});
			data.save(function(err) {
				if(err) console.log(err);
				done(response);
			});
		} else {
			var bar = data[0];
			var match = bar ? bar.bar.going.filter(e=>e.userID === query.userId) : null;
			if(match) {
				if(query.action == 'add') {
					bar.bar.going.push({
						userID: query.userId,
						username: query.username,
					});
				} else if(query.action == 'remove') {
					bar.bar.going = bar.bar.going.filter((e) => e.userID != query.userId);
				}
				if(!bar.bar.going.length) {
					BarsList.remove({'bar.id': query.barId}, function(err) {
						done(response);
					});
				} else {
					bar.save(function(err) {
						if(err) console.log(err);
						done(response);
					});
				}
			} else {
				done(response);
			}
		}
	});
}

function done(response) {
	BarsList.find(function(err, data) {
		response.send(data);
	})
}