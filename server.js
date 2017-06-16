var express = require ('express'); // telling server to use express
var morgan = require ('morgan');

var app = express(); // to get express commands with app.

//Middleware
app.use(morgan('dev'));

app.get('/', function(req, res) {
  var name = "Batman";
  res.json("My name is " + name);
});

app.get('/catname', function(req, res){
  res.json('batman');
});

app.listen(3000, function(err) {  // viewable URL at localhost:3000
  if (err) throw err;
  console.log("Server is Running");
});
