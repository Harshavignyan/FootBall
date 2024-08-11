const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema
const adminSchema = new mongoose.Schema({
    adminemail: String,
    adminpassword: String,
    adminusername: String,
    admincontact: String,
    profilePic: String, // New field for storing the filename of the profile picture
  });

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin