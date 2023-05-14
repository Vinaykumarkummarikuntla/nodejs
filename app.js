const http = require('http');
const routes = require('./routes');
console.log(routes.SomeText)


const server = http.createServer(routes.handler);
console.log("hii")
server.listen(3000);
console.log("bye");
