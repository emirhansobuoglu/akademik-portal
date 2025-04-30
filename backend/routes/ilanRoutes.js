import express from "express";
import Basvuru from "../models/Basvuru.js";
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
router.get("/bildirim", async (req, res) => {
  try {
    const today = new Date();

    // Süresi dolan ilanları getir
    const ilanlar = await Ilan.find({ bitis: { $lt: today } });

    const bildirimler = await Promise.all(
      ilanlar.map(async (ilan) => {
        // Bu ilana ait başvurulardan herhangi biri Onaylandı mı?
        const kazananVar = await Basvuru.exists({
          ilanId: ilan._id,
          durum: "Onaylandı",
        });

        if (kazananVar) return null; // Kazanan varsa bildirim gösterme

        const basvuruSayisi = await Basvuru.countDocuments({
          ilanId: ilan._id,
        });
        return {
          ilanId: ilan._id,
          baslik: ilan.baslik,
          basvuruSayisi,
        };
      })
    );

    // null olanları filtrele
    const aktifBildirimler = bildirimler.filter((item) => item !== null);

    res.status(200).json(aktifBildirimler);
  } catch (error) {
    console.error("Bildirim verisi alınamadı:", error);
    res.status(500).json({ error: "Sunucu hatası" });
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
// ID ile ilan sil
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ilan = await Ilan.findByIdAndDelete(id);
    if (!ilan) return res.status(404).json({ error: "İlan bulunamadı" });
    res.status(200).json({ message: "İlan başarıyla silindi" });
  } catch (error) {
    console.error("🔥 İlan Silme Hatası:", error);
    res.status(500).json({ error: "İlan silinemedi" });
  }
});

export default router;
