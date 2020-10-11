var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var numUsers = 0;

io.on('connection', (socket) => {
    var addedUser = false; 
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('user added', (username)=>{
        if(addedUser)return;
        addedUser = true;
        socket.username = username;
        ++numUsers;
        socket.broadcast.emit('user joined', {
            username: socket.username, 
            numUsers: numUsers
        });
    });

    socket.on('disconnect', ()=>{
        --numUsers;
        socket.broadcast.emit('discon', {
            numUsers: numUsers
        }) ;
    });

  });


http.listen(3000, () => {
  console.log('listening on *:3000');
});
