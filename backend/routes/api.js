var express = require('express'),
	router = express.Router(),
	User = require('../models/user'),
	Location = require('../models/location'),
	randomstring = require("randomstring");


// user routes
router.post('/user/register', function(req, res, next){

	var user = new User();
		user.name = req.body.name;
		user.save(function(err, user){
			res.send(user);
		});
});


// location routes
router.get('/places', function(req, res, next){
	// var filters = {
	// 	maxDistance:req.query.max ? req.query.max : 100000,
	// 	minDistance:req.query.min ? req.query.min : 1000,
	// 	spherical:true,
	// 	uniqueDocs:true,
	// 	query:{user_id:req.query.user_id},
	// };

	//if provided in params then updating the filters distance
	// if(req.query.min){
	// 	filters.minDistance = req.query.min;
	// }

	// if(req.query.max){
	// 	filters.maxDistance = req.query.max;
	// }

	Location.geoNear(
		{
			type:"Point",
			coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]
		},
		{
			maxDistance:req.query.max ? parseInt(req.query.max) : 1000000000000,
			minDistance:req.query.min ? parseInt(req.query.min) : 10,
			spherical:true,
			uniqueDocs:true,
			query:{user_id:req.query.user_id},
		}
	).then(function(locations){
		if(!locations.length){
			res.send({message:"No location found"});
		}else{
			res.send(locations);	
		}
	});

});

router.get('/favorite', function(req, res, next){

	Location.geoNear(
		{type:"Point",coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
		{maxDistance:1000000,spherical:true,query:{user_id:req.query.user_id, favorite:true}},
		function(err, locations, stats){
			if(!locations.length){
				return res.send({message:"No Location Found"});
			}
			res.send(locations);
		}
	);

});

router.post('/upload', function(req, res, next){
	var file = req.files.photo,
	filename = file.name,
	ext = filename.substring(filename.lastIndexOf("."), filename.length).toLowerCase(),
	filename = randomstring.generate({
		length: 12,
		charset: 'numeric'
	}),
	filename = filename + ext;

	file.mv('./photos/'+filename, function(err) {
	    if (err){
	      res.send({status:false});	
	    }else{
	    	Location.update({ _id: req.body.location_id }, 
				{ $push: { photos: filename } }, function(){
					res.send({status:true});
				});
		    }
	  });
});

router.post('/place', function(req, res, next){

	// return res.send({data:req.body});
	var location = new Location();
	location.user_id = req.body.user_id;
	location.name = req.body.name;
	location.city = req.body.city;
	location.state = req.body.state;
	location.zip = req.body.zip;
	location.geometry.coordinates = [parseFloat(req.body.longitude),parseFloat(req.body.latitude)];
	location.save(function(err, location){
		if(err){
			res.send({status:false});
		}else{
			res.send(location);
		}
	});
});

router.put('/place/:id', function(req, res, next){
	Location.findByIdAndUpdate(req.params.id, req.body, function(err, doc){
		if(err){
			res.send({status:false});
		}else{
			res.json({status:true});
			// Location.findById(req.params.id, function(err, doc){
			// });
		}
	});

});

router.delete('/place/:id', function(req, res, next){
	Location.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send({status:false});
		}else{
			res.send({status:true});
		}
	});

});


router.post('/place/favorite', function(req, res, next){
	Location.findById(req.body.location_id, function(err, location){
		if(err){
			res.send({status:false});
		}else{
			// return	res.send(location);
			location.favorite = !location.favorite;
			location.save(function(err, location){
				res.send(location);
			});
		}
	});
});


module.exports = router;