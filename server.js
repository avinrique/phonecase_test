const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const portHttp = 80;  // HTTP port
const portHttps = 443; // HTTPS port

// Paths to SSL certificate and key from Certbot
const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/phonecasecustom.in/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/phonecasecustom.in/fullchain.pem')
};

// Create an HTTPS server
https.createServer(sslOptions, app).listen(portHttps, function() {
    console.log("HTTPS Server running on port 443");
});

// Create an HTTP server to redirect to HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    res.end();
}).listen(portHttp, function() {
    console.log("HTTP Server running on port 80 and redirecting to HTTPS");
});
