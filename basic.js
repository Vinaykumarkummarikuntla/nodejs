const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url == "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><h1>Welcome home</h1></head></html>");
    console.log("home output");
    res.end();
  } else if (req.url === "/about") {
    res.write("<html><head><h1> Welcome to  About Us Page </h1></head></html>");
    res.end();
  } else {
    res.write(
      "<html><head><h1> Welcome to my Node Js project </h1></head></html>"
    );
    res.end();
  }
});
server.listen(3000);

// When url = /home , return response ==> Welcome home
// When url = /about, return response ==> Welcome to About Us page
// When url =/node, return response ==> Welcome to my Node Js project
