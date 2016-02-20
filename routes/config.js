
var config = {};

//Http Server Settings
config.http = {}
config.http.Port = '3000';
	
//MongoDB
config.mongo = {};
config.mongo.Host = '127.0.0.1';
config.mongo.Port = 27017;	
config.mongo.DatabaseName = 'myflows';

//Export the CONFIG MODULE
module.exports = config;

