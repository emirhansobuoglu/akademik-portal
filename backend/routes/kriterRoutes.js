import express from "express";
import KadroKriteri from "../models/KadroKriteri.js";

const router = express.Router();

// Kriter Ekle
router.post("/", async (req, res) => {
  const { ilanId, aciklama, maxPuan } = req.body;

  if (!ilanId || !aciklama || !maxPuan) {
    return res.status(400).json({ error: "Eksik alanlar var" });
  }

  try {
    const kriter = await KadroKriteri.create({ ilanId, aciklama, maxPuan });
    res.status(201).json(kriter);
  } catch (error) {
    console.error("🔥 Kriter Ekleme Hatası:", error);
    res.status(500).json({ error: "Kriter eklenemedi" });
  }
});

// Belirli ilan için Kriterleri Getir
router.get("/", async (req, res) => {
  const { ilanId } = req.query;

  if (!ilanId) {
    return res.status(400).json({ error: "İlan ID gerekli" });
  }

  try {
    const kriterler = await KadroKriteri.find({ ilanId });
    res.json(kriterler);
  } catch (error) {
    console.error("🔥 Kriter Getirme Hatası:", error);
    res.status(500).json({ error: "Kriterler getirilemedi" });
  }
});

// Kriter Sil
router.delete("/", async (req, res) => {
  const { kriterId } = req.body;

  if (!kriterId) {
    return res.status(400).json({ error: "Kriter ID gerekli" });
  }

  try {
    await KadroKriteri.findByIdAndDelete(kriterId);
    res.status(200).json({ message: "Kriter başarıyla silindi" });
  } catch (error) {
    console.error("🔥 Kriter Silme Hatası:", error);
    res.status(500).json({ error: "Kriter silinemedi" });
  }
});

export default router;
