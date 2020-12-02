import mongoose, { Schema } from "mongoose";

const traineeMeasurementSchema = new Schema(
  {
    height: { type: String },
    weight: { type: String },
    chest: { type: String },
    arms: { type: String },
    waist: { type: String },
    shoulder: { type: String },
    neck: { type: String },
    forearms: { type: String },
    hip: { type: String },
    thigh: { type: String },
    calves: { type: String },
    weightPlan: {
      type: String,
      required: true,
      enum: ["weight loss", "weight gain"]
    },
    targetWeight: { type: String },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TraineeMeasurement", traineeMeasurementSchema);
