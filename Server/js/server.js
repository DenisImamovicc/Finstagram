import http from "http";
import url from "url";
import fs from "fs";
import mime from "mime-types";
const __filename="C:/Users/Denis/Desktop/Visual studio/Arbetsprov/cygni-takeawaytest"
const PORT=3000
const lookup = mime.lookup

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `Client`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");

  if (path == "") {
    path = "index.html";
  }
  console.log(`Requested path ${path} `,__filename);

  let file = __filename + "/Client/" + path;
  //async read file function uses callback
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      //specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      let mime = lookup(path);
      res.writeHead(200, { "Content-type": mime });
      res.end(content);
    }
  });
});

server.listen(PORT, "localhost", () => {
  console.log(`Server live at:http://localhost:${PORT}/`);
});