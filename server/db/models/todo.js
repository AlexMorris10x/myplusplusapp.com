const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TODOSchema = new Schema({
  value: { type: String, unique: false },
  username: { type: String, unique: false },
  project: { type: String, unique: false },
  complete: { type: Boolean, unique: false }
});

// Create reference to User & export
const TODO = mongoose.model("TODO", TODOSchema);
module.exports = TODO;
