var mongo = require('mongodb');
var url  = require('url');
var config = require('./config');
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server(config.mongo.Host, config.mongo.Port, {auto_reconnect: true});
db = new Db(config.mongo.DatabaseName, server, {safe:true}); 


db.open(function(err, db) {
    if(!err) {
        console.log("Connected to "+config.mongo.DatabaseName+" database");
        db.collection('workflows', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'workflows' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.getAllWorkFlows = function(req, res) {

    var skip = req.query.skip;
    var limit = req.query.limit;
    var options = new Object();
    options['skip'] = parseInt(skip);
    options['limit'] = parseInt(limit);   
    console.log(options);
    db.collection('workflows', function(err, collection) {
        collection.find({}, options).toArray(function(err, results){
	    console.log(results);        	
            res.send(results);
        });
    });
};

exports.getWorkFlow = function(req, res) {
    var id = req.params.id;
    db.collection('workflows', function(err, collection) {
        collection.findOne({'_id':id}, function(err, item) {
        res.send(item);        	
        });
    });
};

exports.modifyWorkFlow = function(req, res) {
    var id = req.params.id;
    var payload = req.body;
    console.log(id);
    console.log(payload);
    var objectId = new ObjectID(id);
    db.collection('workflows', function(err, collection) {
        collection.update({'_id':objectId}, payload, {upsert:true, w: 1} , function(err, item) {
            res.send(item);        	
        });
    });
};

exports.addWorkFlow = function(req, res) {
   var payload = req.body;
   var user = req.session.user;
   payload['username'] = user.username;
   payload['type'] = 'owner';
   payload['userId'] = user._id;
   db.collection('workflows', function(err, collection) {
      collection.insert(payload, function(err, item) {
         res.send(item);
      });
   });
};

exports.removeWorkFlow = function(req, res) {
	var id = req.params.id;
	var objectId = new ObjectID(id);
	db.collection('workflows', function(err, collection) {
	   collection.deleteOne({'_id':objectId}, function(err, item) {
		res.send(item);
          });
	});
};

exports.generateWorkFlowId = function(req, res) {
	var objectId = new ObjectID();
	console.log(objectId);
	res.send(objectId);
};                   

exports.getUserWorkFlows = function(req, res) {
        var username = req.params.username;	
        console.log(username);
	db.collection('workflows', function(err, collection) {
	   collection.find({"username":username}).toArray(function(err, items) {
		res.send(items);
	   });
	});
};


exports.createUserWorkFlows = function(req, res) {
	var id = req.params.id;
	var payload = req.body;
        var emails = payload.emails;	
	var workflow = null;
        var objectId = new ObjectID(id);
	db.collection('workflows', function(err, collection) {
	  collection.findOne({'_id':objectId}, function(err, item) {
	    	console.log(item);
		workflow = item;
	 
	        //Now that you have the workflows, need to associate it to them
	 
                var len = emails.length;
	        for(var i = 0; i<len; i++){
	           db.collection('user_workflows', function(err, collection) {
	             delete workflow['_id']
	             delete workflow['username'];
                     workflow['username'] = emails[i];
	             collection.insert(workflow);
		     //SEND EMAIL
                     var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
		     var mailOptions = {
			from : "homebrew@geekclub.com",
		        to : emails[i],
			subject : "You have been invited to MyFlows",
			text : "Welcome.  Please visit us"
		     };
		     transporter.sendMail(mailOptions, function(error, info){
                     if(error){
                        return console.log(error);
                     }
                     console.log('Message sent: ' + info.response);
                     });
	          });
                }
		res.send("SUCCESS");
	   });
        });
};

