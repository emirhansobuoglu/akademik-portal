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

export default router;
