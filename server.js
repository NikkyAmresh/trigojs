const http = require('http');
const fs = require('fs')
const requestListener = function (req, res) {
  let f = req.url === '/' ? 'index.html' : 'src/script.mjs'

  // commenting that block will give an empty mime type and module will not be loaded
  if (f === 'src/script.mjs') {
    res.setHeader('Content-type', 'text/javascript')
  }
  res.writeHead(200)
  return fs.createReadStream(f).pipe(res)
}

const server = http.createServer(requestListener);
server.listen(5500);
console.log('listening: http://localhost:5500')