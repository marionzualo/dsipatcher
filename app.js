var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http');
    

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.methodOverride());
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io = require('socket.io').listen(httpServer);

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku

/*
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});*/

io.sockets.on('connection', function (socket) {
	socket.on('contact-server', function (data) {
		console.log('received ' + data);
		io.sockets.emit('contact-client',{ msg : data});
	});
});