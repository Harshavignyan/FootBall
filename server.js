var express = require('express')
var app = express()
const http = require('http');
const socketIo = require('socket.io');
var path = require('path')

// Create an HTTP server
const server = http.createServer(app);

// Bind socket.io to the server
const io = socketIo(server);

// Serve the static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'public/dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});

// Start the server
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
  
