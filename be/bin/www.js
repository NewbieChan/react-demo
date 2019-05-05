const http = require('http');
const handler = require('../app');

const server = http.createServer(handler);
const PORT = 8000;

server.listen(PORT);