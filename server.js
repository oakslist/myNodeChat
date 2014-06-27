var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*var redis = require('socket.io-redis');*/
/*io.adapter(redis({ host: 'localhost', port: 5556 }));*/

//it sends main page to users
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

//use it each time when smth was happend in client-side
io.on('connection', function(socket) {
  //it gets and sends back messages from users


//http://habrahabr.ru/post/127525/

  //it writes about new user
  socket.on('newUser', function(newUser) {
    var time = (new Date).toLocaleTimeString();
    console.log(newUser + ' join to us.');
    io.emit('message:', {'time': time, 'msg': newUser + ' join to us'});
  });

  //it writes about new user success
  socket.on('newUserSuccess', function(newUser) {
    console.log(newUser + ' join to us.');
    io.emit('message:', newUser + ' join to us.');
  });

  socket.on('newMessage', function(msg) {
    var time = (new Date).toLocaleTimeString();
    console.log('message: ' + time + ' : ' + msg);
    io.emit('message:', {'time': time, 'msg': msg});
  });
  
  //it writes 
  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });
  
  //it writes about disconected people
  socket.on('logoutUser', function (logoutUser) {
    io.emit('message:', logoutUser + ' logout from chat.');
    io.sockets.emit('logoutUser');
  });
});

//our port which server is listening
http.listen(5555, function() {
  console.log('listening on *:5555');
});