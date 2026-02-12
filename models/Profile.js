const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  about: String,
  email: String,
  phone: String,
  github: String,
  linkedin: String,
});

module.exports = mongoose.model("Profile", profileSchema);
