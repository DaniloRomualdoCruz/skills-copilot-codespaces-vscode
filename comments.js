// Create web server
// Run server: node comments.js
// Test: http://localhost:8080/comments
const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');

const comments = [];

// Create server
http.createServer((req, res) => {
  // Get the URL and parse it
  const parsedURL = url.parse(req.url);
  // Get the path
  const path = parsedURL.pathname;
  // Get the query string as an object
  const query = qs.parse(parsedURL.query);

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Send the response
  res.setHeader('Content-Type', 'application/json');

  // Check if the path is /comments
  if (path === '/comments') {
    // Check if the method is GET
    if (method === 'get') {
      // Send the comments
      res.writeHead(200);
      res.end(JSON.stringify(comments));
    }

    // Check if the method is POST
    if (method === 'post') {
      // Get the comments
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        // Add the comment to the comments array
        comments.push(JSON.parse(body));
        // Send the comments
        res.writeHead(200);
        res.end(JSON.stringify(comments));
      });
    }
  } else {
    // Send error
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}).listen(8080);
