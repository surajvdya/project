import mongoose, { Schema } from "mongoose";

const workoutCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutCategory", workoutCategorySchema);
