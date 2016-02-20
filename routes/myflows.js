var mongo = require('mongodb');
var url  = require('url');
var config = require('./config');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server(config.mongo.Host, config.mongo.Port, {auto_reconnect: true});
db = new Db(config.mongo.DatabaseName, server, {safe:true}); 


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to "+config.mongo.DatabaseName+"database");
        db.collection('restful', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'myflows' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


exports.helloworld = function(req, res){
	res.send("{message:Hello World}");
}

                   
