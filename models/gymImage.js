import mongoose, { Schema } from "mongoose";

const gymImageSchema = new Schema(
  {
    imageName: { type: String, required: true },
    url: { type: String, required: true },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GymImage", gymImageSchema);
