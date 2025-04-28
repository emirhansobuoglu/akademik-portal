// server.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import basvuruRoutes from "./routes/basvuruRoutes.js";
import ilanRoutes from "./routes/ilanRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// Ana Routes
app.use("/backend-api/auth", authRoutes);
app.use("/backend-api/basvurular", basvuruRoutes);
app.use("/backend-api/ilanlar", ilanRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend çalışıyor !");
});

// Sunucu Başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
