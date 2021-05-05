// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// create an instance of express to serve our end points
const app = express();
// port 
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
// bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// cors 
app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

const routes = require('./routes/routes.js')(app, fs);

// finally, launch our server on port 3000.
app.listen(port, () => {
  console.log(`Listening at ${port}`);
});