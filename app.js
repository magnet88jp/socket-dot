var app = require('http').createServer(handlar),
  io = require('socket.io').listen(app),
  fs = require('fs');
app.listen(1337);
//io.set('log level', 1);
function handlar(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data){
		if (err) {
			res.writeHead(500);
			return res.end('Error');
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	})
}

var chat = io.of('/chat').on('connection', function(socket){
	socket.on('emit_from_client', function(data){
		// console.log(data);
		// 接続しているsocketのみ
		// socket.emit('emit_from_server', 'hello from server: ' + data);
		// 接続しているsocket以外
		// socket.broadcast.emit('emit_from_server', 'hello from server: ' + data);
		// 接続しているsocket 全部
//		 io.sockets.emit('emit_from_server', '[' + socket.name + ']: ' + data);
//		 io.sockets.emit('emit_from_server', '[' + data.name + ']: ' + data.msg);
        socket.join(data.room);
//		socket.emit('emit_from_server', 'you are in  ' + data.room);
		socket.emit('emit_from_server', data.msg);
		socket.broadcast.to(data.room).emit('emit_from_server', '[' + data.name + ']: ' + data.msg);


	});

});

var news = io.of('/news').on('connection', function(socket){
	socket.emit('emit_from_server', 'today: ' + new Date());
});
