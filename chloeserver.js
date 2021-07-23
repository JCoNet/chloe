const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem'), 'UTF-8', callback),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'), 'UTF-8', callback),
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("CHLOE HOST 1 IS ONLINE.\n");
}).listen(8000);