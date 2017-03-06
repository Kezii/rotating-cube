var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var nsp = io.of('/data');

app.use('/', express.static('app'));

io.on('connection', function(socket){
  socket.on('acc', function(acc){
    nsp.emit('acc', acc);
  });

  socket.on('rot', function(rot){
    nsp.emit('rot', rot);
  });

  socket.on('pong', function(ms){
      var d = new Date();
      var n = d.getMilliseconds();
      console.log("PONG")
      console.log(n-ms)
  });


});

setInterval(function(){
    var d = new Date();
    var n = d.getMilliseconds();

    io.emit("ping",n );
    
    console.log("PING")

},500)



http.listen(3000, function(){
  console.log('listening on *:3000');
});
