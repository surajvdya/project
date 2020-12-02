import mongoose, { Schema } from "mongoose";

const workoutSubCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutCategory",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutSubCategory", workoutSubCategorySchema);
