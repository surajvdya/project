import mongoose, { Schema } from "mongoose";

const gymTrainerSchema = new Schema(
  {
    gym: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true
    },
    isVerified: { type: Boolean, defaultValue: false }, //approved by gym ?
    currentStatus: { type: Boolean, default: true }, //currently associated gym
    startDate: { type: Date },
    endDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GymTrainer", gymTrainerSchema);
