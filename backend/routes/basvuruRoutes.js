import express from "express";
import connectDB from "../lib/db.js";
import Basvuru from "../models/Basvuru.js";

const router = express.Router();

router.post("/", async (req, res) => {
    await connectDB();
    try {
        const { adayAd, ilanId, durum, belgeler, cv, ekDosya, ekAciklama, aciklama } = req.body;

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

export default router;
