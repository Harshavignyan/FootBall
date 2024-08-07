var express = require('express');
var app = express();
const http = require('http');
const socketIo = require('socket.io');
var path = require('path');

// Create an HTTP server
const server = http.createServer(app);

// Bind socket.io to the server with CORS options
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

// Serve the static files from the "dist" directory
// app.use(express.static(path.join(__dirname, 'public/dist')));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming state updates
  socket.on('updateScore', (data) => {
    // Broadcast the update to all connected clients
    io.emit('scoreUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
