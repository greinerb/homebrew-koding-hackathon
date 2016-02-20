var mongo = require('mongodb');
var url  = require('url');
var config = require('./config');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var usersCollection = 'users';
var server = new Server(config.mongo.Host, config.mongo.Port, {auto_reconnect: true});
db = new Db(config.mongo.DatabaseName, server, {safe:true}); 


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to "+config.mongo.DatabaseName+"database");
        db.collection(usersCollection, {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});


exports.helloworld = function(req, res){
	res.send("{message:Hello World}");
}

exports.getAllUsers = function(req, res) {

    var skip = req.query.skip;
    var limit = req.query.limit;
    console.log("skip : "+skip);
    console.log("limit : "+limit);
    var options = new Object();
    options['skip'] = parseInt(skip);
    options['limit'] = parseInt(limit);   
    console.log(options);
    db.collection('users', function(err, collection) {
        collection.find({}, options).toArray(function(err, results){
	    console.log(results);        	
            res.send(results);
        });
    });
};

exports.getUser = function(req, res) {
    var id = req.params.id;
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':id}, function(err, item) {
        res.send(item);        	
        });
    });
i};

exports.modifyUser = function(req, res) {
    var id = req.params.id;
    var payload = req.body;
    db.collection(usersCollection, function(err, collection) {
        collection.update({'_id':id}, payload, {safe:true}, function(err, item) {
            res.send(item);        	
        });
    });
};                   
