import express from "express";
import multer from "multer";
import connectDB from "../lib/db.js";
import Basvuru from "../models/Basvuru.js";

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Başvuru yap (POST /backend-api/basvurular)
router.post("/basvurular", upload.array("belgeler"), async (req, res) => {
    await connectDB();

    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { adayAd, ilanId } = req.body;

        if (!adayAd || !ilanId) {
            return res.status(400).json({ error: "Eksik bilgiler gönderildi." });
        }

        const belgeler = req.files.map(file => file.originalname);

        const yeniBasvuru = new Basvuru({
            adayAd,
            ilanId,
            belgeler,
            durum: "Beklemede",
        });

        await yeniBasvuru.save();
        res.status(201).json({ message: "Başvuru başarıyla kaydedildi." });

    } catch (error) {
        console.error("Başvuru ekleme hatası:", error);
        res.status(500).json({ error: "Başvuru yapılamadı." });
    }
});

// Diğer route'lar da aynı kalacak
export default router;
