'use strict';
var SocketIo = require('socket.io');

module.exports = function(server){
	var io = SocketIo(server);

	io.on('connection', function(client){
		console.log('connection...');
		client.no('msg-send', function(xx){
			client.broadcast.emit('msg-get', xx);
		});
		client.on('disconnect', function(){
			console.log('disconnect');
		});
	});
}