import mongoose from "mongoose";

const JuriSchema = new mongoose.Schema(
  {
    ilanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ilan",
      required: true,
    },
    adSoyad: { type: String, required: true },
    tcNo: { type: String, required: true, unique: false }, // Aynı jüri başka ilana da atanabilir
  },
  { timestamps: true }
);

export default mongoose.models.Juri || mongoose.model("Juri", JuriSchema);
