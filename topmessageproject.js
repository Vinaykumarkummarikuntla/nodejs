const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      '<html><head><title>Enter Message</title></head><body>'
    );

    // read messages from file
    fs.readFile("messageeeee.txt", (err, data) => {
      if (err) {
        console.error(err);
        if (err.code === "ENOENT") {
          // create the file if it doesn't exist
          fs.writeFile("messageeeee.txt", "", (err) => {
            if (err) {
              console.error(err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "text/plain");
              res.write("An error occurred while creating the message file.");
              return res.end();
            } else {
              // file created successfully, show empty message list
              res.write('<h1>Messages:</h1>');
              res.write('<ul></ul>');
            }
          });
        } else {
          // another error occurred while reading the file
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.write("An error occurred while reading the messages.");
          return res.end();
        }
      } else {
        // display messages at the top of the form
        res.write('<h1>Messages:</h1>');
        res.write('<ul>');
        const messages = data.toString().split("\n");
        for (let i = messages.length - 1; i >= 0; i--) {
          res.write('<li>' + messages[i] + '</li>');
        }
        res.write('</ul>');
      }

      // display form for new message
      res.write('<form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body></html>');
      return res.end();
    });

  } else if (url === "/message" && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const message = Buffer.concat(body).toString();
      fs.appendFile("messageeeee.txt", message + "\n", err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.write("An error occurred while saving the message.");
          res.end();
        } else {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>");
    res.end();
  }
});

server.listen(3000);
