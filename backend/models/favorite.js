var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var favoriteSchema = new Schema({
	location_id:String,
	user_id:String,
	created_at:{ type: Date, default: Date.now }

});

module.exports = mongoose.model('Favorite',favoriteSchema);