const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PROJECTSchema = new Schema({
  username: { type: String, unique: false },
  text: { type: String, unique: false }
});

const PROJECT = mongoose.model("PROJECT", PROJECTSchema);
module.exports = PROJECT;
