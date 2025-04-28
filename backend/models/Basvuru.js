// models/Basvuru.js
import mongoose from "mongoose";

const BasvuruSchema = new mongoose.Schema({
    ilanId: { type: mongoose.Schema.Types.ObjectId, ref: "Ilan", required: true },
    adayAd: { type: String, required: true },
    belgeler: { type: [String], default: [] },
    aciklama: { type: String, default: "" },
    durum: { type: String, enum: ["Beklemede", "Onaylandı", "Reddedildi"], default: "Beklemede" },
});

export default mongoose.models.Basvuru || mongoose.model("Basvuru", BasvuruSchema);
