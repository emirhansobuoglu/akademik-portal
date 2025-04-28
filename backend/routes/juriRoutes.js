import express from "express";
import Juri from "../models/JuriAtama.js";

const router = express.Router();

// Jüri Ekle
router.post("/", async (req, res) => {
  const { ilanId, adSoyad, tcNo } = req.body;

  if (!ilanId || !adSoyad || !tcNo) {
    return res.status(400).json({ error: "Eksik alanlar var" });
  }

  try {
    const juri = await Juri.create({ ilanId, adSoyad, tcNo });
    res.status(201).json(juri);
  } catch (error) {
    console.error("🔥 Jüri Ekleme Hatası:", error);
    res.status(500).json({ error: "Jüri eklenemedi" });
  }
});

// Belirli ilana atanmış jürileri getir
router.get("/", async (req, res) => {
  const { ilanId } = req.query;

  if (!ilanId) {
    return res.status(400).json({ error: "İlan ID gerekli" });
  }

  try {
    const juriListesi = await Juri.find({ ilanId });
    res.json(juriListesi);
  } catch (error) {
    console.error("🔥 Jüri Getirme Hatası:", error);
    res.status(500).json({ error: "Jüri getirilemedi" });
  }
});

// Jüri Sil
router.delete("/", async (req, res) => {
  const { juriId } = req.body;

  if (!juriId) {
    return res.status(400).json({ error: "Jüri ID gerekli" });
  }

  try {
    await Juri.findByIdAndDelete(juriId);
    res.status(200).json({ message: "Jüri silindi" });
  } catch (error) {
    console.error("🔥 Jüri Silme Hatası:", error);
    res.status(500).json({ error: "Jüri silinemedi" });
  }
});

export default router;
