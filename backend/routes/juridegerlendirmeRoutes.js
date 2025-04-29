import express from "express";
import connectDB from "../lib/db.js";
import Basvuru from "../models/Basvuru.js";
import JuriDegerlendirme from "../models/JuriDegerlendirme.js";

const router = express.Router();

// Jüri Değerlendirme Kaydet
router.post("/", async (req, res) => {
  await connectDB();

  try {
    const { juriTc, basvuruId, puanlar, rapor, sonuc } = req.body;

    if (!juriTc || !basvuruId || !puanlar || !sonuc) {
      return res.status(400).json({ error: "Eksik alanlar var" });
    }

    // 1. Değerlendirme kaydet
    const yeniDegerlendirme = new JuriDegerlendirme({
      juriTc,
      basvuruId,
      puanlar,
      rapor,
      sonuc,
    });
    await yeniDegerlendirme.save();

    // 2. Eğer jüri sonucu "onaylı" ise, başvurunun juriOnaySayisi'ni 1 arttır
    if (sonuc === "onaylı") {
      await Basvuru.findByIdAndUpdate(
        basvuruId,
        { $inc: { juriOnaySayisi: 1 } },
        { new: true }
      );
    }

    res.status(201).json({
      message: "Değerlendirme kaydedildi ve gerekli güncelleme yapıldı",
    });
  } catch (error) {
    console.error("🔥 Değerlendirme kaydedilemedi:", error);
    res.status(500).json({ error: "Değerlendirme kaydedilemedi" });
  }
});
// Belirli bir başvuru ve juri için değerlendirmeyi getir
router.get("/basvuru/:basvuruId/juri/:tcNo", async (req, res) => {
  await connectDB();
  try {
    const { basvuruId, tcNo } = req.params;

    const degerlendirme = await JuriDegerlendirme.findOne({
      basvuruId: basvuruId,
      juriTc: tcNo,
    });

    if (!degerlendirme) {
      return res.status(404).json({ error: "Değerlendirme bulunamadı" });
    }

    res.json(degerlendirme);
  } catch (error) {
    console.error("🔥 Değerlendirme sorgulama hatası:", error);
    res.status(500).json({ error: "Değerlendirme sorgulama hatası" });
  }
});
// Belirli bir başvuru için TÜM jüri değerlendirmelerini getir
router.get("/:basvuruId", async (req, res) => {
  await connectDB();
  try {
    const { basvuruId } = req.params;

    const degerlendirmeler = await JuriDegerlendirme.find({
      basvuruId: basvuruId,
    });

    res.json(degerlendirmeler);
  } catch (error) {
    console.error(
      "🔥 Başvuruya ait jüri değerlendirmeleri getirilemedi:",
      error
    );
    res.status(500).json({ error: "Değerlendirmeler getirilemedi" });
  }
});

export default router;
