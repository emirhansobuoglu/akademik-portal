import mongoose from "mongoose";

const KadroKriteriSchema = new mongoose.Schema(
  {
    ilanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ilan",
      required: true,
    },
    aciklama: { type: String, required: true },
    maxPuan: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.KadroKriteri ||
  mongoose.model("KadroKriteri", KadroKriteriSchema);
