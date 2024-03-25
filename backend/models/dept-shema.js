const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deptSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
});

module.exports = mongoose.model("Department", deptSchema);
