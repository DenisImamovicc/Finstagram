import http from "http";
import url from "url";
import fs from "fs";
import mime from "mime-types";

const __filename="C:/Users/Denis/Desktop/Visual studio"
                +"/Arbetsprov/cygni-takeawaytest";
const PORT=3000;
const lookup = mime.lookup;

//handle the req and send back a static file from a folder `Client`
const server = http.createServer(function(req, res){
  const parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");

  if (path === "") {path = "index.html";}
  console.log(`Requested path ${path} `,__filename);

  const file = __filename + "/Client/" + path;
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}.`
                  +`Need to change __filename`
                  +`to fit your terminal path.`);
      res.writeHead(404);
      res.end();
    } else {
      //specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      const mime = lookup(path);
      res.writeHead(200, { "Content-type": mime });
      res.end(content);
    }
  });
});

server.listen(PORT, "localhost", function(){
  console.log(`Server live at:http://localhost:${PORT}/`);
});