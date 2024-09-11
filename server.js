const app = require('./app')
const server = require('http').createServer(app);
const io = require("socket.io")(server,{cors: {origin:"*"}});
const port = process.env.PORT || 80

server.listen(port, function() {
    console.log("localhost:"+port);

  });