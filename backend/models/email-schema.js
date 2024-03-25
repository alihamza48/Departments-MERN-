const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
});
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Email", emailSchema);
