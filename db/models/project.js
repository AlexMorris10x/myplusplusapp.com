const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PROJECTSchema = new Schema({
  value: { type: String, unique: false },
  username: { type: String, unique: false }
  // created: { type: Date, default: Date.now },
  // updated: { type: Date, default: Date.now },
});

// Create reference to User & export
const PROJECT = mongoose.model("PROJECT", PROJECTSchema);
module.exports = PROJECT;
