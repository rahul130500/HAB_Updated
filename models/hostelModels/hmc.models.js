const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  contno: { type: Number, required: true },
  roomno: { type: String, required: true },
  priono: { type: Number, required: true },
  hostel: { type: String},
  creation: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("hmcDetail", detailsSchema);
