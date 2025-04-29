import mongoose from "mongoose";

const NihaiKararSchema = new mongoose.Schema(
  {
    ilanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ilan",
      required: true,
    },
    adayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aciklama: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.NihaiKarar ||
  mongoose.model("NihaiKarar", NihaiKararSchema);
