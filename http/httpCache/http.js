/**
 * Created by wangkai on 2019-05-29
 * Node Static Server
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 5000;
const absolutePath = dir => path.resolve(__dirname, `./public${dir}`);
const app = http.createServer((req, res) => {
  const { url } = req;
  fs.readFile(absolutePath(url), (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (err) {
      res.end('Not Found');
    } else {
      res.end(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
