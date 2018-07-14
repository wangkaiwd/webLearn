var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('他说：含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('哈哈哈')
    response.end()
  } else if (path === '/main') {
    response.setHeader('Content-Type', 'text/css;chartset=utf-8')
    response.end('h1{color:red}');

  } else if (path === '/2.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(`
    <DOCTYPE! html>
    <head>
    <link rel="stylesheet" href="/main">
    </head>
    <h1>你好</h1>
    <script src="/1"></script>
    <script>
      let xhr = new XMLHttpRequest();
      xhr.open('get', 'http://localhost:9999/3.json');
      xhr.send();
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log('object', xhr.responseText);
            var info = xhr.responseText;
            var jsonInfo = JSON.parse(info);
            // var info = JSON.parse(xhr.responseText);
            console.log(jsonInfo);
          }
        }
      }
    </script>
    `);
  } else if (path === '/1') {
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8');
    response.end('alert(1)');
  } else if (path === '/3.json') {
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    response.end('{"name":"wangkaiwd","age":"18"}');
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
