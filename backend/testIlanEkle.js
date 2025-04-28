// testIlanEkle.js

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // .env dosyasından MONGO_URI çekeceğiz

const IlanSchema = new mongoose.Schema({
    baslik: String,
    kadro: String,
    baslangic: Date,
    bitis: Date,
    belgeler: [String],
    kosullar: String
});

const Ilan = mongoose.model("Ilan", IlanSchema);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);

    await Ilan.create({
        baslik: "Bilgisayar Mühendisliği - Doktor Öğretim Üyesi",
        kadro: "Doktor Öğretim Üyesi",
        baslangic: new Date("2025-05-01"),
        bitis: new Date("2025-05-30"),
        belgeler: ["Diploma", "Yabancı Dil Belgesi"],
        kosullar: "Alanında en az 2 yıl akademik tecrübe sahibi olmak."
    });

    console.log("✅ İlan başarıyla eklendi!");
    process.exit(0);
}

main().catch((err) => {
    console.error("🔥 Hata oluştu:", err);
    process.exit(1);
});
