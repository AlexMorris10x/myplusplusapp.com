const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PROJECTSchema = new Schema({
  value: { type: String, unique: false },
  username: { type: String, unique: false }
});

const PROJECT = mongoose.model("PROJECT", PROJECTSchema);
module.exports = PROJECT;
