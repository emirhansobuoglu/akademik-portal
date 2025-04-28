import mongoose from "mongoose";

const IlanSchema = new mongoose.Schema({
    baslik: {
        type: String,
        required: true,
    },
    kadro: {
        type: String,
        required: true,
    },
    baslangic: {
        type: Date,
        required: true,
    },
    bitis: {
        type: Date,
        required: true,
    },
    belgeler: {
        type: [String],
        default: [],
    },
    kosullar: {
        type: String,
        default: "",
    },
});

export default mongoose.models.Ilan || mongoose.model("Ilan", IlanSchema);
