import mongoose, { Schema } from "mongoose";

const traineeTrainerSchema = new Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true
    },
    currentStatus: { type: Boolean, default: true }, //currently associated with this trainer
    isVerified: { type: Boolean, default: false }, //is verified by trainer
    startDate: { type: Date },
    endDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TraineeTrainer", traineeTrainerSchema);
