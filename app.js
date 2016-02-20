var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
var myflows = require('./routes/myflows');

var app = express();


app.use(logger({path: "homebrew.log"}));     
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



app.get('/myflows/helloworld', myflows.helloworld);

app.use(express.static('/static'));

app.listen(3001);
console.log('Listening on port 3000...');


















