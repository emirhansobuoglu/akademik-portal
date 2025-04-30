import express from "express";
import Ilan from "../models/Ilan.js";
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
// Belirli jüriye (tcNo) atanmış ilanları getir
router.get("/tc/:tcNo", async (req, res) => {
  const { tcNo } = req.params;

  if (!tcNo) {
    return res.status(400).json({ error: "TC kimlik numarası gerekli" });
  }

  try {
    const atamalar = await Juri.find({ tcNo });

    if (atamalar.length === 0) {
      return res.status(404).json({ error: "Jüriye ait atama bulunamadı" });
    }

    const ilanIdListesi = atamalar.map((j) => j.ilanId);

    const ilanlar = await Ilan.find({ _id: { $in: ilanIdListesi } });

    res.status(200).json(ilanlar);
  } catch (error) {
    console.error("🔥 TC ile ilan getirme hatası:", error);
    res.status(500).json({ error: "İlanlar getirilemedi" });
  }
});
export default router;
