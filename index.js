var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//it sends main page to users
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

//use it each time when smth was happend in client-side
io.on('connection', function(socket) {
  //it gets and sends back messages from users
  socket.on('newMessage', function(msg) {
    console.log('message: ' + msg);
    io.emit('message:', msg);
  });
  
  //it writes about new commers
  socket.on('newUser', function(newUser) {
    console.log(newUser + ' join to us.');
    io.emit('message:', newUser + ' join to us.');
  });
  
  //it writes 
  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });
  
  //it writes about disconected people
  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});

//our port which server is listening
http.listen(5555, function() {
  console.log('listening on *:5555');
});