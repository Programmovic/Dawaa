const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password_hash: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String },
    country: { type: String },
    phone_number: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
