var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
//var myflows = require('./routes/myflows');
var users = require('./routes/users');

var app = express();


app.use(logger({path: "homebrew.log"}));     
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({type:'application/*+json'}));

var jsonParser = bodyParser.json();


app.get('/myflows/helloworld', users.helloworld);

app.post('/login', users.validateLogin);

app.get('/myflows/user*', users.getAllUsers);
 
app.get('/myflows/user/:id', users.getUser);
app.put('/myflows/user/:id', jsonParser, users.modifyUser);
app.put('/myflows/user',jsonParser,users.addUser);
//app.post('/myflows/user', myflows.queryUser);

app.use('/', express.static('static'));

app.listen(3001);
console.log('Listening on port 3001...');


















