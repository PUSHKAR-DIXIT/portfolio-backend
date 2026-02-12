const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: String,
  image: String,
});

module.exports = mongoose.model("Certificate", certificateSchema);
