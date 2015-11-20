'use strict';
var SocketIo = require('socket.io');

module.exports = function(server){
	var io = SocketIo(server);
	// base
	io.on('connection', function(client){
		client.on('msg-send', function(xx){
			client.broadcast.emit('msg-get', xx);
		});
		client.on('disconnect', function(){
			console.log('disconnect');
		});
	});

	// multiplexing socket
	var chat = io.of('/chat')
				.on('connection', function(client){
					client.on('msg-send', function(xx){
						client.broadcast.emit('msg-get', xx);
					});
					client.on('disconnect', function(){
						console.log('chat disconnect');
					});
				});
	var statistics = io.of('/statistics')
				.on('connection', function(client){
					client.on('send', function(xx){
						client.broadcast.emit('get', xx);
					});
					client.on('disconnect', function(){
						console.log('statistics disconnect');
					});
				});
}