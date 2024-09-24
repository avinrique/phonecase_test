const app = require('./app')
const server = require('http').createServer(app);
const port = 3000

server.listen(port, function() {
    console.log("localhost:"+port);

  });