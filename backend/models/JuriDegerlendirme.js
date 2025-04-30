import mongoose from "mongoose";

const JuriDegerlendirmeSchema = new mongoose.Schema(
  {
    juriTc: {
      type: String,
      required: true,
    },
    basvuruId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Basvuru",
      required: true,
    },
    puanlar: { type: Object, required: true }, // JSON formatı
    rapor: { type: String },
    sonuc: { type: String, enum: ["onaylı", "reddedildi"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.JuriDegerlendirme ||
  mongoose.model("JuriDegerlendirme", JuriDegerlendirmeSchema);
