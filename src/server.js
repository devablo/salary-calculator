var express = require('express');
var app = express();

//Specify a port
var port = process.env.port || 3000;

//Serve up files in public folder
//app.use('/', express.static(__dirname + '../public'));
app.use('/', express.static('public'))
/* 
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
 */
//Start up the website
app.listen(port);
console.log('Listening on port: ', port);
