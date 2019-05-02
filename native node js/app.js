const http = require('http');

const routes = require('./router');
const server = http.createServer(routes.requestHandler);

server.listen(3000);