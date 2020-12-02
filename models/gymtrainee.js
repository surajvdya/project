import mongoose, { Schema } from "mongoose";

const gymTraineeSchema = new Schema(
  {
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true
    },
    currentStatus: { type: Boolean, default: true }, //currently associated gym
    isVerified: { type: Boolean, default: false },
    joiningDate: { type: Date, required: true },
    endingDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GymTrainee", gymTraineeSchema);
