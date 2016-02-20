var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
//var myflows = require('./routes/myflows');
var users = require('./routes/users');

var app = express();


app.use(logger({path: "homebrew.log"}));     
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



app.get('/myflows/helloworld', users.helloworld);

app.get('/myflows/user*', users.getAllUsers);
 
app.get('/myflows/user/:id', users.getUser);
app.put('/myflows/user/:id', users.modifyUser);
//app.post('/myflows/user', myflows.queryUser);

app.use('/', express.static('static'));

app.listen(3001);
console.log('Listening on port 3001...');


















