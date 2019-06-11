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
    if (err) {
      res.writeHead(404, 'Not Found');
      res.end('Not Found');
    } else {
      // 要根据不同的MIME类型进行区分加载
      res.writeHead(200, 'OK');
      res.end(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
