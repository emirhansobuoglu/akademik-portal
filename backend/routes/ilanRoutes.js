import express from "express";
import Ilan from "../models/Ilan.js";

const router = express.Router();

// Tüm ilanları getir
router.get("/", async (req, res) => {
    try {
        const ilanlar = await Ilan.find();
        res.json(ilanlar);
    } catch (error) {
        console.error("🔥 Tüm İlanlar Getirme Hatası:", error);
        res.status(500).json({ error: "İlanlar getirilemedi" });
    }
});

// ID ile ilan getir
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const ilan = await Ilan.findById(id);
        if (!ilan) return res.status(404).json({ error: "İlan bulunamadı" });
        res.json(ilan);
    } catch (error) {
        console.error("🔥 Tek İlan Getirme Hatası:", error);
        res.status(500).json({ error: "İlan getirilemedi" });
    }
});

// 🔥 Yeni ilan ekle
router.post("/", async (req, res) => {
    try {
        const yeniIlan = new Ilan(req.body);
        const kaydedilen = await yeniIlan.save();
        res.status(201).json(kaydedilen);
    } catch (error) {
        console.error("🔥 İlan Ekleme Hatası:", error);
        res.status(500).json({ error: "İlan eklenemedi" });
    }
});

export default router;
