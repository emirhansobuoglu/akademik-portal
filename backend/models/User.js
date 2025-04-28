// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  tckn: { type: String, required: true, unique: true, length: 11 },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["aday", "admin", "juri", "yonetici"], default: "aday" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
