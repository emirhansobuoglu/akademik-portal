import mongoose from "mongoose";

const BasvuruSchema = new mongoose.Schema({
    ilanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ilan",
        required: true,
    },
    adayAd: {
        type: String,
        required: true,
    },
    cv: {
        type: String, // Firebase URL
        required: true,
    },
    ekDosya: {
        type: String, // Firebase URL
        default: "",
    },
    ekAciklama: {
        type: String,
        default: "",
    },
    belgeler: {
        type: [String],
        default: [],
    },
    aciklama: {
        type: String,
        default: "",
    },
    durum: {
        type: String,
        enum: ["Beklemede", "Onaylandı", "Reddedildi"],
        default: "Beklemede",
    },
    kazananMi: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.Basvuru ||
    mongoose.model("Basvuru", BasvuruSchema);
