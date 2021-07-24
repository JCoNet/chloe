const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('chloe/key.pem'),
  cert: fs.readFileSync('chloe/cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("CHLOE HOST 1 IS ONLINE.\n");
}).listen(8000);