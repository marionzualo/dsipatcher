var io = require('socket.io').listen(3000);

io.sockets.on('connection', function (socket) {
	socket.on('contact-server', function (data) {
		console.log('received ' + data);
		io.sockets.emit('contact-client',{ msg : data});
	});
});