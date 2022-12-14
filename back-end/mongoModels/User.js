const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Users", schema, "Users");
