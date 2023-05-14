const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      '<html><head><title>Enter Message</title></head><body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body></html>'
    );

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("AppMessage.txt", "dummy text for npm installing purpose");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

// 1st way to  export modules to app.js
// module.exports = requestHandler

// 2nd way to export modules to app.js
// module.exports = {
//     handle :requestHandler,
//     someText: 'some hard code text'
// }

// 3rd way to export modules to app.js
exports.handler = requestHandler
exports.SomeText = 'some hard code'
