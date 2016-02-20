var mongo = require('mongodb');
var url  = require('url');
var config = require('./config');
var ObjectID = require('mongodb').ObjectID;

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server(config.mongo.Host, config.mongo.Port, {auto_reconnect: true});
db = new Db(config.mongo.DatabaseName, server, {safe:true}); 


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to "+config.mongo.DatabaseName+" database");
        db.collection('tasks', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'tasks' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.getAllTasks = function(req, res) {

    var skip = req.query.skip;
    var limit = req.query.limit;
    var options = new Object();
    options['skip'] = parseInt(skip);
    options['limit'] = parseInt(limit);   
    console.log(options);
    db.collection('tasks', function(err, collection) {
        collection.find({}, options).toArray(function(err, results){
	    console.log(results);        	
            res.send(results);
        });
    });
};

exports.getTask = function(req, res) {
    var id = req.params.id;
    db.collection('tasks', function(err, collection) {
        collection.findOne({'_id':id}, function(err, item) {
        res.send(item);        	
        });
    });
};

exports.modifyTask = function(req, res) {
    var id = req.params.id;
    var payload = req.body;
    console.log(id);
    console.log(payload);
    var objectId = new ObjectID(id);
    db.collection('tasks', function(err, collection) {
        collection.update({'_id':objectId}, payload, {upsert:true, w: 1} , function(err, item) {
            res.send(item);        	
        });
    });
};

exports.addTask = function(req, res) {
   var payload = req.body;
   var objectId = new ObjectID();
   db.collection('tasks', function(err, collection) {
      collection.insert(payload, function(err, item) {
         res.send(item);
      });
   });
};
                   
