var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var workflows = require('./routes/workflows');
var tasks = require('./routes/tasks');

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
	    	//console.log("[200] " + req.method + " to " + req.url);
	    	var fullBody = '';
	    
	    	req.on('data', function(chunk) {
	      	// append the current chunk of data to the fullBody variable
	      		fullBody += chunk.toString();
	   	 });
	    
	      req.on('end', function() {    
	      // request ended -> do something with the data
	      //res.writeHead(200, "OK", {'Content-Type': 'text/html'});      
	      // parse the received body data
	      //var decodedBody = querystring.parse(fullBody);

              var user = null;

	      users.validateLogin(req, res, fullBody, function(err, result){
                user = result;
		console.log(result);
              
              console.log("user : "+user);
              if (user) {
                console.log("inside of user");
                // Regenerate session when signing in
                // to prevent fixation
                req.session.regenerate(function(){
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
		req.session.success = 'Authenticated as ' + user.name
                 + ' click to <a href="/logout">logout</a>. '
                 + ' You may now access <a href="/restricted">/restricted</a>.';
                 res.redirect('/#list');
                 });
              } else {
                 req.session.error = 'Authentication failed, please check your '
                 + ' username and password.'
                 res.redirect('/#login');
               }
            });
	  });
           }
         }
         catch(e){console.log(e);}
});

app.get('/myflows/user*', users.getAllUsers);
 
app.get('/myflows/user/:id', users.getUser);
app.put('/myflows/user/:id', jsonParser, users.modifyUser);
app.put('/myflows/user',jsonParser,users.addUser);
//app.post('/myflows/user', myflows.queryUser);


app.get('/myflows/workflow/:id', workflows.getWorkFlow);
app.put('/myflows/workflow/:id', workflows.modifyWorkFlow);
app.put('/myflows/workflow', jsonParser, workflows.addWorkFlow);
app.get('/myflows/workflow/generateId', workflows.generateWorkFlowId);
app.get('/myflows/workflow/user/:id', workflows.getUserWorkFlows);
app.put('/myflows/workflow/:id/emailInvites', jsonParser, workflows.createUserWorkFlows);
app.delete('/myflows/workflow/:id', workflows.removeWorkFlow);

app.get('/myflows/task/:id', tasks.getTask);
app.put('/myflows/task/:id', tasks.modifyTask);
app.put('/myflows/task', jsonParser, tasks.addTask);
app.get('/myflows/task/generateId', tasks.generateTaskId);
app.delete('/myflows/task/:id', tasks.removeTask);


app.use('/', express.static('static'));

app.listen(3001);
console.log('Listening on port 3001...');


















