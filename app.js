var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var workflows = require('./routes/workflows');
var tasks = require('./routes/tasks');
var config = require('./routes/config');
var session = require('express-session');

var app = express();


app.use(logger({path: "homebrew.log"}));     
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({type:'application/*+json'}));


app.use(session({
  secret: 'home geek club',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}));

var jsonParser = bodyParser.json();

app.post('/myflows/login', function(req, res){
   
          try{
	    if (req.method == 'POST') {
	    	var fullBody = '';
	    	req.on('data', function(chunk) {
	      	fullBody += chunk.toString();
	   	 });
	      req.on('end', function() {    

              var user = null;

	      users.validateLogin(req, res, fullBody, function(err, result){
                user = result;
		console.log(result);
              
              if (user) {
                console.log("inside of user");
                req.session.regenerate(function(){
                              
                delete user['password'];
                user['status']='SUCCESS';
                req.session.user = user;
		 res.send(user);
                 });
              } else {
                 var user = new Object();
		 user['status'] = 'ERROR';
                 user['message'] = 'Authentication failed. Please check your username and password';
		 res.send(user);
               }
            });
	  });
           }
         }
         catch(e){console.log(e);}
});

app.get('/myflows/logout', users.logout);


app.get('/myflows/activeUser', users.getActiveUser);
app.get('/myflows/user/:id', users.getUser);
app.put('/myflows/user/:id', jsonParser, users.modifyUser);
app.put('/myflows/user',jsonParser,users.addUser);
app.get('/myflows/user', users.getAllUsers);


app.put('/myflows/workflow/:id', jsonParser, workflows.modifyWorkFlow);
app.put('/myflows/workflow', jsonParser, workflows.addWorkFlow);
app.get('/myflows/workflow/generateId', jsonParser, workflows.generateWorkFlowId);
app.get('/myflows/workflow/:id', workflows.getWorkFlow);
app.get('/myflows/workflow/user/:username', jsonParser,  workflows.getUserWorkFlows);
app.put('/myflows/workflow/:id/emailInvites', jsonParser, workflows.createUserWorkFlows);
app.delete('/myflows/workflow/:id', workflows.removeWorkFlow);

app.put('/myflows/task/:id', jsonParser, tasks.modifyTask);
app.put('/myflows/task', jsonParser, tasks.addTask);
app.get('/myflows/task/generateId', tasks.generateTaskId);
app.delete('/myflows/task/:id', tasks.removeTask);
app.get('/myflows/task/:id', tasks.getTask);


app.use('/', express.static('static'));

app.listen(config.http.Port);
console.log('Listening on port '+config.http.Port+'...');


















