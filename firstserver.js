const http = require('http');
const server = http.createServer((req, res) => {
console.log("Welcome Vinay Kumar!");
console.log("Welcome nodejs!")

}); 
server.listen(4000);