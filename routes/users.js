var mongo = require('mongodb');
var url  = require('url');
var config = require('./config');
var ObjectID = require('mongodb').ObjectID;
var hash = require('../utils/hash');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var usersCollection = 'users';
var server = new Server(config.mongo.Host, config.mongo.Port, {auto_reconnect: true});
db = new Db(config.mongo.DatabaseName, server, {safe:true}); 


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to "+config.mongo.DatabaseName+" database");
        db.collection(usersCollection, {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.logout = function(req, res){
	req.session.user = null;
	res.send(null);
}

exports.getActiveUser = function(req, res){
	res.send(req.session.user);
}


exports.validateLogin = function(req, res, fullBody, callback ){


   var object = JSON.parse(fullBody);
   var username = object.username;
   var password = object.password;
   var hashPassword = null;
   hash.hashVal(password, function(err, result) {
	hashPassword = result;
        db.collection('users', function(err, collection) {
          collection.findOne({username:username, password : hashPassword}, function(err, result) {
            callback(null, result);
          });
       });
   });
};   


exports.getAllUsers = function(req, res) {
    var skip = req.query.skip;
    var limit = req.query.limit;
    var options = new Object();
    options['skip'] = parseInt(skip);
    options['limit'] = parseInt(limit);   
    db.collection('users', function(err, collection) {
        collection.find({}, options).toArray(function(err, results){
	    for(var i=0;i<results.length;i++){
	      delete results[i]['password'];
            }        	
            res.send(results);
        });
    });
};

exports.getUser = function(req, res) {
    var id = req.params.id;
var objectId = new ObjectID(id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':objectId}, function(err, item) {
        try{delete item['password'];}catch(e){}
	res.send(item);        
        });
    });
};

exports.modifyUser = function(req, res) {
    var id = req.params.id;
    var payload = req.body;
    var password = payload.password;
    var username = payload.username;
    if(null!=password && ""!=password){
    	var hashPassword = null;
    	hash.hashVal(password, function(err, result) {
        	hashPassword = result;
   	});
	payload.password = hashPassword;
    }
    else{
     db.collection('users', function(err, collection) {
	collection.findOne({username:username}, function(err, result){
        payload.password = result.password;
        });
     });
    }
    var objectId = new ObjectID(id);
    db.collection('users', function(err, collection) {
        collection.update({'_id':objectId}, payload, {upsert:true, w: 1} , function(err, item) {
                delete item['password'];
		res.send(item);        	
        });
    });
};

exports.addUser = function(req, res) {
   var payload = req.body;
   var objectId = new ObjectID();
   var hashPassword = null;
   var password = payload.password;
    hash.hashVal(password, function(err, result) {
        hashPassword = result;
   });
   payload.password = hashPassword;
   var username = payload.username;
   db.collection('users',function(err, collection) {
      collection.findOne({username:username}, function(err, item) {
      if(item){  
        res.send("{ERRORCODE:409}");
      } 
      else{
        db.collection('users', function(err, collection) {
          collection.insert(payload, function(err, item) {
             res.send(item);
          });
        });
      }
    });
  });
};
                   
