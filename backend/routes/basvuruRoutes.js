import express from "express";
import connectDB from "../lib/db.js";
import Basvuru from "../models/Basvuru.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await connectDB();
  try {
    const {
      adayAd,
      ilanId,
      durum,
      belgeler,
      cv,
      ekDosya,
      ekAciklama,
      aciklama,
    } = req.body;

    if (!adayAd || !ilanId || !cv) {
      return res.status(400).json({ error: "Gerekli alanlar eksik" });
    }

    const yeniBasvuru = new Basvuru({
      adayAd,
      ilanId,
      belgeler,
      cv,
      ekDosya,
      ekAciklama,
      aciklama,
      durum: durum || "Beklemede",
    });

    await yeniBasvuru.save();
    res.status(201).json(yeniBasvuru);
  } catch (error) {
    console.error("Başvuru oluşturulamadı:", error);
    res.status(500).json({ error: "Başvuru oluşturulamadı" });
  }
});

router.get("/aday/:adayAd", async (req, res) => {
  await connectDB();
  try {
    const { adayAd } = req.params;
    const basvurular = await Basvuru.find({ adayAd });
    res.json(basvurular);
  } catch (error) {
    console.error("Başvurular getirilemedi:", error);
    res.status(500).json({ error: "Başvurular getirilemedi" });
  }
});

router.patch("/kazanani-sec", async (req, res) => {
  await connectDB();

  const { selectedIds } = req.body;

  if (!selectedIds || !Array.isArray(selectedIds)) {
    return res.status(400).json({ error: "Seçilen başvuru listesi eksik." });
  }

  try {
    await Basvuru.updateMany({}, { durum: "Reddedildi" });

    await Basvuru.updateMany(
      { _id: { $in: selectedIds } },
      { durum: "Onaylandı" }
    );

    res.status(200).json({ message: "Başvurular başarıyla güncellendi." });
  } catch (error) {
    console.error("🔥 Kazananı seçme hatası:", error);
    res.status(500).json({ error: "Başvurular güncellenemedi." });
  }
});

router.get("/ilan/:ilanId/basvurular", async (req, res) => {
  await connectDB();
  try {
    const { ilanId } = req.params;
    const basvurular = await Basvuru.find({ ilanId });
    res.json(basvurular);
  } catch (error) {
    console.error("İlan başvuruları getirilemedi:", error);
    res.status(500).json({ error: "Başvurular alınamadı" });
  }
});
router.get("/ilan/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const basvurular = await Basvuru.find({ ilanId: id });
    res.status(200).json(basvurular);
  } catch (err) {
    console.error("Başvuru getirme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:basvuruId/yonlendir", async (req, res) => {
  await connectDB();
  try {
    const { basvuruId } = req.params;

    const updated = await Basvuru.findByIdAndUpdate(
      basvuruId,
      { durum: "Yetkiliye Yönlendirildi" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Başvuru bulunamadı." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Başvuru yönlendirme hatası:", error);
    res.status(500).json({ error: "Yönlendirme başarısız." });
  }
});
router.patch("/kazananlari-iptal-et", async (req, res) => {
  const { ilanId } = req.body;

  if (!ilanId) {
    return res.status(400).json({ error: "İlan ID gerekli." });
  }

  try {
    const result = await Basvuru.updateMany(
      { ilanId: ilanId },
      { $set: { durum: "Beklemede" } }
    );

    res.status(200).json({
      message: "Kazananlar başarıyla iptal edildi.",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Kazananları iptal etme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});
router.get("/:id", async (req, res) => {
  await connectDB();
  try {
    const { id } = req.params;
    const basvuru = await Basvuru.findById(id);

    if (!basvuru) {
      return res.status(404).json({ error: "Başvuru bulunamadı." });
    }

    res.status(200).json(basvuru);
  } catch (error) {
    console.error("Tekil başvuru getirilemedi:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

export default router;
