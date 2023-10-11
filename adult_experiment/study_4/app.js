global.__base = __dirname + '/';

var 
    use_https     = true,
    argv          = require('minimist')(process.argv.slice(2)),
    https         = require('https'),
    fs            = require('fs'),
    app           = require('express')(),
    _             = require('lodash'),
    parser        = require('xmldom').DOMParser,
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
    sendPostRequest = require('request').post;    






var gameport;

if(argv.gameport) {
  gameport = argv.gameport;
  console.log('using port ' + gameport);
} else {
  gameport = 8883;
  console.log('no gameport specified: using 8880\nUse the --gameport flag to change');
}

try {
  var privateKey  = fs.readFileSync('/etc/apache2/ssl/stanford-cogsci_org.key'),
      certificate = fs.readFileSync('/etc/apache2/ssl/stanford-cogsci_org.crt'),
      intermed    = fs.readFileSync('/etc/apache2/ssl/stanford-cogsci_org.ca-bundle'),
      options     = {key: privateKey, cert: certificate, ca: intermed},
      server      = require('https').createServer(options,app).listen(gameport),
      io          = require('socket.io')(server);
} catch (err) {
  console.log("cannot find SSL certificates; falling back to http");
  var server      = app.listen(gameport),
      io          = require('socket.io')(server);
}

app.get('/*', (req, res) => {
  serveFile(req, res); 
});


io.on('connection', function (socket) {

  socket.emit('onConnected', 'Connected to server')
  

  // set up trial list for participant
  initializeWithTrials(socket);

  // write data to db upon getting current data
  socket.on('currentData', function(data) {
	console.log('currentData received: ' + JSON.stringify(data));
	// Increment games list in mongo here
	writeDataToMongo(data); 
    });

});


function initializeWithTrials(socket) {
    console.log("initializewithtrials called")
    var colname = 'study_4'; //insert STIMULI DATASETNAME here
    var packet = { 
      init: colname
    }
    socket.emit('onConnected', packet)
}
  
FORBIDDEN_FILES = ["auth.json"]

var serveFile = function(req, res) {
  var fileName = req.params[0];
  if(FORBIDDEN_FILES.includes(fileName)){
    // Don't serve files that contain secrets
    console.log("Forbidden file requested: "+filename);
    return; 
  }
  console.log('\t :: Express :: file requested: ' + fileName);
  return res.sendFile(fileName, {root: __dirname});
};




var serveFile = function(req, res) {
  var fileName = req.params[0];
  console.log('\t :: Express :: file requested: ' + fileName);
  return res.sendFile(fileName, {root: __dirname}); 
};

var writeDataToMongo = function(data) {
      sendPostRequest(
        'http://localhost:3000/db/insert',
        { json: data },
        (error, res, body) => {
      if (!error && res.statusCode === 200) {
        console.log(`sent data to store`);
      } else {
        console.log(`error sending data to store: ${error} ${body}`);
      }
    }
  );
};

