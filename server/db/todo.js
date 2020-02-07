const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TODOSchema = new Schema({
  username: { type: String, unique: false },
  text: { type: String, unique: false },
  projectId: { type: String, unique: false },
  projectName: { type: String, unique: false },
  complete: { type: Boolean, unique: false },
  completeDate: { type: String, unique: false },
  order: { type: String, unique: false }
});

const TODO = mongoose.model("TODO", TODOSchema);
module.exports = TODO;
