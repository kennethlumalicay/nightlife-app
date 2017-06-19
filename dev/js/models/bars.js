'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
	bar: {
		id: String,
		going: [{
			userID: String,
			username: String
		}]
	}
}, {collection: 'bars'});

module.exports = mongoose.model('Bar', Bar);