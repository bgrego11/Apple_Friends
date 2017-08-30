var express = require('express');
var app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);

games = []

app.use(express.static(__dirname + '/public'));

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function(req,res) {
  res.sendfile(__dirname + '/public/index.html')
});

io.sockets.on('connection',function(socket){
  socket.on('newGame', function(data) {
    games.push(data);
    console.log("it worked");
    console.log(games);
  });

  socket.on('joinReq', function(data) {
    for (i in games) {
      if (games[i].group === data.group) {
        games[i].members.push(data.reqName);
        console.log("it worked");
        console.log(games);
      }
    }
  })
})
