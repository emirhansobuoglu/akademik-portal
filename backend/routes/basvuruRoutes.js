// routes/basvuruRoutes.js
import express from "express";
import multer from "multer";
import connectDB from "../lib/db.js";
import Basvuru from "../models/Basvuru.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.array("belgeler"), async (req, res) => {
  await connectDB();
  try {
    const { adayAd, ilanId, durum } = req.body;
    const belgeler = req.files?.map((file) => file.originalname) || [];

    if (!adayAd || !ilanId) {
      return res.status(400).json({ error: "Gerekli alanlar eksik" });
    }

    const yeniBasvuru = new Basvuru({
      adayAd,
      ilanId,
      belgeler,
      durum: durum || "Beklemede",
    });
    await yeniBasvuru.save();
    res.status(201).json(yeniBasvuru);
  } catch (error) {
    console.error("Başvuru oluşturulamadı:", error);
    res.status(500).json({ error: "Başvuru oluşturulamadı" });
  }
});
router.get("/:basvuruId", async (req, res) => {
  await connectDB();
  try {
    const { basvuruId } = req.params;
    const basvuru = await Basvuru.findById(basvuruId);

    if (!basvuru) {
      return res.status(404).json({ error: "Başvuru bulunamadı" });
    }

    res.status(200).json(basvuru);
  } catch (error) {
    console.error("Başvuru getirilemedi:", error);
    res.status(500).json({ error: "Başvuru getirilemedi" });
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

router.get("/ilan/:ilanId", async (req, res) => {
  await connectDB();
  try {
    const { ilanId } = req.params;
    const basvurular = await Basvuru.find({ ilanId });
    res.json(basvurular);
  } catch (error) {
    console.error("İlan başvuruları getirilemedi:", error);
    res.status(500).json({ error: "İlan başvuruları getirilemedi" });
  }
});
// backend/routes/basvuruRoutes.js
router.patch("/kazanani-sec", async (req, res) => {
  await connectDB();

  const { selectedIds } = req.body;

  if (!selectedIds || !Array.isArray(selectedIds)) {
    return res.status(400).json({ error: "Seçilen başvuru listesi eksik." });
  }

  try {
    // Önce hepsini Reddedildi yap
    await Basvuru.updateMany({}, { durum: "Reddedildi" });

    // Seçilenleri Onaylandı yap
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

export default router;
