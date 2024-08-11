const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    contact: String,
    profilePic: String, // New field for storing the filename of the profile picture
  });

var User = mongoose.model('User', userSchema);
module.exports = User