var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var locationSchema = new Schema({
	user_id:String,
	name:{
		type:String,
		required:[true,'location name is required']
	},
	city:String,
	state:String,
	zip:Number,
	favorite:{
		type: Boolean,
		default:false
	},
	photos:{
		type:[]
	},
	geometry:{
		type:{
			type:String,
			default:"point"
		},

		coordinates:{
			type:[Number],
			index:"2dsphere"
		}
	}

});

module.exports = mongoose.model('Location',locationSchema);