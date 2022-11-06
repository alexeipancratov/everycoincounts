const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  username: { type: String, required: true, unique: false },
  bio: { type: String, required: true, unique: false },
  avatarKey: { type: String, required: true, unique: false },
  category: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Institutions", schema, "Institutions");
