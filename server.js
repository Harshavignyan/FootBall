const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Admin = require("./public/admin.model");
const User = require("./public/user.model");
const crypto = require('crypto');
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));

const JWT_SECRET = crypto.randomBytes(32).toString('hex');

// Enable CORS for all routes
app.use(cors());

mongoose.connect("mongodb://localhost:27017/football")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const username = req.body.username;
    const userPath = path.join(__dirname, "public", "uploads", username);

    // Create the directory if it doesn't exist
    fs.mkdirSync(userPath, { recursive: true });

    callback(null, userPath);
  },
  filename: (req, file, callback) => {
    callback(null, "profilePic" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin and User Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // First, check the Admin collection
    let user = await Admin.findOne({ adminusername: username, adminpassword: password });
    if (user) {
      const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
      const profilePic = user.profilePic ? `/uploads/${username}/${user.profilePic}` : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
      return res.json({ username, token, role: 'admin', profilePic });
    }

    // If not found in Admin, check the User collection
    user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
      const profilePic = user.profilePic ? `/uploads/${username}/${user.profilePic}` : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
      return res.json({ username, token, role: 'user', profilePic });
    }

    // If no user found
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Admin Signup route with file upload
app.post('/registeradmin', upload.single('profilePic'), async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const { email, password, username, contact } = req.body;
    const existingAdmin = await Admin.findOne({ adminemail: email });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({
      adminemail: email,
      adminpassword: password,
      adminusername: username,
      admincontact: contact,
      profilePic: req.file ? req.file.filename : null, // Save the file name in the database
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Signup route with file upload
app.post('/registeruser', upload.single('profilePic'), async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const { email, password, username, contact } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      email,
      password,
      username,
      contact,
      profilePic: req.file ? req.file.filename : null, // Save the file name in the database
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// WebSocket setup and handling
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('updateScore', (data) => {
    console.log('Received updateScore event with data:', data);
    io.emit('scoreUpdated', data);
  });

  socket.on('updateCountries', (data) => {
    console.log('Received updateCountries event with data:', data);
    io.emit('countriesUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
